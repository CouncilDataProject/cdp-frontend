import { removeStopwords } from "stopword";
import { nGram } from "n-gram";
import { stem } from "stemr";
import IndexedEventGram from "../models/IndexedEventGram";
import IndexedEventGramService from "./IndexedEventGramService";
import { NetworkService } from "./NetworkService";
import { NoDocumentsError } from "./NetworkResponse";
import { COLLECTION_NAME } from "./PopulationOptions";
import { sumBy, maxBy } from "lodash";
import EventService from "./EventService";
import Event from "../models/Event";
import { createError } from "../utils/createError";
import { getStorage, ref, getDownloadURL } from "@firebase/storage";
import { FirebaseConfig } from "../app/AppConfigContext";
import cleanText from "../utils/cleanText";

/**
 * The primary return of searchEvents.
 * Contains all information needed to created paginated requests for full event
 * information, along with minimal information used for display.
 */
class MatchingEvent {
  eventRef: string;
  pureRelevance: number;
  datetimeWeightedRelevance: number;
  containedGrams: string[];
  selectedContextSpan: string;

  constructor(
    eventId: string,
    pureRelevance: number,
    datetimeWeightedRelevance: number,
    containedGrams: string[],
    selectedContextSpan: string
  ) {
    this.eventRef = `${COLLECTION_NAME.Event}/${eventId}`;
    this.pureRelevance = pureRelevance;
    this.datetimeWeightedRelevance = datetimeWeightedRelevance;
    this.containedGrams = containedGrams;
    this.selectedContextSpan = selectedContextSpan;
  }
}

/**
 * The primary return of getRenderableEvent.
 * Contains all information needed to created paginated requests for full event
 * information, along with minimal information used for display.
 */
export class RenderableEvent {
  event: Event;
  pureRelevance: number;
  datetimeWeightedRelevance: number;
  containedGrams: string[];
  selectedContextSpan: string;
  keyGrams: string[];
  staticThumbnailURL: string;
  hoverThumbnailURL: string;

  constructor(
    event: Event,
    pureRelevance: number,
    datetimeWeightedRelevance: number,
    containedGrams: string[],
    selectedContextSpan: string,
    keyGrams: string[],
    staticThumbnailURL: string,
    hoverThumbnailURL: string
  ) {
    this.event = event;
    this.pureRelevance = pureRelevance;
    this.datetimeWeightedRelevance = datetimeWeightedRelevance;
    this.containedGrams = containedGrams;
    this.selectedContextSpan = selectedContextSpan;
    this.keyGrams = keyGrams;
    this.staticThumbnailURL = staticThumbnailURL;
    this.hoverThumbnailURL = hoverThumbnailURL;
  }
}

export default class EventSearchService {
  networkService: NetworkService;
  eventService: EventService;
  indexedEventGramService: IndexedEventGramService;
  private serviceName: string;

  constructor(firebaseConfig: FirebaseConfig) {
    this.networkService = NetworkService.getInstance(
      firebaseConfig.options,
      firebaseConfig.settings
    );
    this.eventService = new EventService(firebaseConfig);
    this.indexedEventGramService = new IndexedEventGramService(firebaseConfig);
    this.serviceName = "EventSearchService";
  }

  /**
   * cleanText function is almost a mirror of the `clean_text` function from
   * cdp-backend Python. Only major difference is there is no boolean parameter
   * for indicating if we want to clean stopwords, this function is only currently
   * used for searching and thus should always clean stopwords.
   *
   * Removes punctuation, line breaks, tabs, special character strings, stopwords,
   * and any extra spaces in string (2+ spaces become 1 space).
   *
   * Returns as an array of string instead of string to pass into ngrams
   */
  cleanText(query: string): string[] {
    const cleanedQuery = cleanText(query);
    // Remove stopwords
    // Return as list of terms
    return removeStopwords(cleanedQuery.split(" "));
  }

  getStemmedGrams(query: string): string[] {
    const cleanedQuery = this.cleanText(query);
    const stemmedGrams: string[] = [];
    Array.from([1, 2, 3]).forEach((nGramSize) => {
      const allGrams: string[][] = nGram(nGramSize)(cleanedQuery);
      allGrams.forEach((gramSet) => {
        stemmedGrams.push(
          gramSet
            .map((gram) => {
              return stem(gram);
            })
            .join(" ")
            .toLowerCase()
        );
      });
    });

    return stemmedGrams;
  }

  /**
   * searchEvents will break a query into it's gram parts (and of multiple gram sizes),
   * query the database for matching events, and compile the results into an array of
   * MatchingEvent objects that can be used for later full event information display.
   *
   * See getRenderableEvent for taking the results of this function and retrieving
   * "render ready" objects.
   */
  async searchEvents(query: string): Promise<MatchingEvent[]> {
    // Clean and stem the query into all ngram sizes
    const allStemmedGramsFromQuery = this.getStemmedGrams(query);

    // Initiate all queries to database
    const allGramSearchPromises = allStemmedGramsFromQuery.map((stemmedGram) =>
      this.indexedEventGramService.getMatchingGrams(stemmedGram)
    );

    // Catch allSettled not all to protect against NoDocumentsError(s)
    const matchingEvents: Map<string, IndexedEventGram[]> = new Map();
    const compiledEvents: MatchingEvent[] = [];
    try {
      await Promise.allSettled(allGramSearchPromises).then((allGramSearchResults) => {
        // Iter all query results and unpack
        allGramSearchResults.forEach((gramSearchResult) => {
          // If the promise was fulfilled, unpack the results onto the map
          if (gramSearchResult.status === "fulfilled") {
            gramSearchResult.value.forEach((indexedGram) => {
              if (indexedGram.event_ref !== undefined) {
                // Get or update matching event list
                const currentGramsForEvent = matchingEvents.get(indexedGram.event_ref);
                if (currentGramsForEvent === undefined) {
                  matchingEvents.set(indexedGram.event_ref, [indexedGram]);
                } else {
                  currentGramsForEvent.push(indexedGram);
                }
              }
            });
            // Otherwise, check the error
            // If it's an allowed NoDocumentsError, ignore it
          } else {
            // Only reraise if an error besides no documents occurred
            if (!(gramSearchResult.reason instanceof NoDocumentsError)) {
              throw gramSearchResult.reason;
            }
          }
        });

        // Compile results into MatchingEvents object
        for (const [eventId, matchingIndexedEventGrams] of matchingEvents) {
          // Get gram with highest value for event
          const matchingGramWithHighestValue = maxBy(matchingIndexedEventGrams, "value");

          // Unpack matchingGram to protect from undefined
          let selectedContextSpan = "";
          if (matchingGramWithHighestValue && matchingGramWithHighestValue.context_span) {
            selectedContextSpan = matchingGramWithHighestValue.context_span;
          } else {
            selectedContextSpan = "";
          }

          // Get grams found in event from query
          const containedGrams = matchingIndexedEventGrams.reduce((list, gram) => {
            if (gram.unstemmed_gram !== undefined) {
              list.push(gram.unstemmed_gram);
            }
            return list;
          }, [] as string[]);

          compiledEvents.push(
            new MatchingEvent(
              eventId,
              sumBy(matchingIndexedEventGrams, "value"),
              sumBy(matchingIndexedEventGrams, "datetime_weighted_value"),
              containedGrams,
              selectedContextSpan
            )
          );
        }
      });

      return Promise.resolve(compiledEvents);

      // Handle service error
    } catch (err) {
      const error = createError(err);
      error.message = `${this.serviceName}_searchEvents(${query})_${error.message}`;
      return Promise.reject(error);
    }
  }

  /**
   * getRenderableEvent fetches all data required for rendering an Event Card.
   */
  async getRenderableEvent(matchingEvent: MatchingEvent): Promise<RenderableEvent> {
    const eventId = matchingEvent.eventRef.split("/")[1];
    const fullEventPromise = this.eventService.getFullEventById(eventId);

    const eventKeyGramsPromise = this.indexedEventGramService.getKeyGramsForEvent(
      matchingEvent.eventRef
    );

    try {
      const [event, eventKeyGrams] = await Promise.all([fullEventPromise, eventKeyGramsPromise]);

      // Unpack keygrams to get strings
      const keyUnstemmedGrams = eventKeyGrams.reduce((list, gram) => {
        if (gram.unstemmed_gram !== undefined) {
          list.push(gram.unstemmed_gram);
        }
        return list;
      }, [] as string[]);

      // Get https storage URLs
      const storage = getStorage();
      const staticThumbnailPathRef = ref(storage, event.static_thumbnail?.uri);
      const hoverThumbnailPathRef = ref(storage, event.hover_thumbnail?.uri);
      const staticThumbnailPathURL = await getDownloadURL(staticThumbnailPathRef);
      const hoverThumbnailPathURL = await getDownloadURL(hoverThumbnailPathRef);

      return Promise.resolve(
        new RenderableEvent(
          event,
          matchingEvent.pureRelevance,
          matchingEvent.datetimeWeightedRelevance,
          matchingEvent.containedGrams,
          matchingEvent.selectedContextSpan,
          keyUnstemmedGrams,
          staticThumbnailPathURL,
          hoverThumbnailPathURL
        )
      );

      // Handle service error
    } catch (err) {
      const error = createError(err);
      error.message = `${this.serviceName}_getRenderableEvent(${matchingEvent.eventRef})_${error.message}`;
      return Promise.reject(error);
    }
  }
}
