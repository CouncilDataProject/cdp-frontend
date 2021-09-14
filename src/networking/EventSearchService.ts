import { removeStopwords } from "stopword";
import { nGram } from "n-gram";
import { stem } from "stemr";
import IndexedEventGram from "../models/IndexedEventGram";
import IndexedEventGramService from "./IndexedEventGramService";
import { NetworkService } from "./NetworkService";
import { NoDocumentsError } from "./NetworkResponse";
import { COLLECTION_NAME } from "./PopulationOptions";
import { sumBy } from "lodash";

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

export default class EventSearchService {
  networkService: NetworkService;
  indexedEventGramService: IndexedEventGramService;
  private serviceName: string;

  constructor() {
    this.networkService = NetworkService.getInstance();
    this.indexedEventGramService = new IndexedEventGramService();
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
    // Replace new line and tab characters with a space
    let cleanedQuery = query.replace(/[\t\n]+/g, " ");

    // Replace common strings used by documents on backend
    // Not _really_ needed here but a nice safety measure to match the alg
    cleanedQuery = cleanedQuery.replace(/[\-\-]/, " ");

    // Same as Python standard punctuation string
    cleanedQuery = cleanedQuery.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");

    // Remove extra spaces
    cleanedQuery = cleanedQuery.replace(/\s{2,}/g, " ");

    // Remove leading and trailing spaces
    // Remove stopwords
    // Return as list of terms
    return removeStopwords(cleanedQuery.trim().split(" "));
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
   * See getFullEventResult for taking the results of this function and retrieving
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
    Promise.allSettled(allGramSearchPromises).then((allGramSearchResults) => {
      // Iter all query results and unpack
      allGramSearchResults.forEach((gramSearchResult) => {
        // If the promise was fulfilled, unpack the results onto the map
        if (gramSearchResult.status === "fulfilled") {
          gramSearchResult.value.forEach((indexedGram) => {
            // NOTE:
            // The model unpacking seems to be incorrect
            // From the code, because I am explicitely not requesting to get the event objects
            // I would expect `event_ref` to be a string
            // but rather, `event_ref` is undefined and `event` is populated with only `id`
            if (indexedGram.event !== undefined) {
              if (indexedGram.event.id !== undefined) {
                // Get or update matching event list
                const currentGramsForEvent = matchingEvents.get(indexedGram.event.id);
                if (currentGramsForEvent === undefined) {
                  matchingEvents.set(indexedGram.event.id, [indexedGram]);
                } else {
                  currentGramsForEvent.push(indexedGram);
                  matchingEvents.set(indexedGram.event.id, currentGramsForEvent);
                }
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
        const matchingGramWithHighestValue = matchingIndexedEventGrams.reduce((prev, current) => {
          if (prev.value !== undefined && current.value !== undefined) {
            return prev.value > current.value ? prev : current;
          } else {
            return prev;
          }
        });

        compiledEvents.push(
          new MatchingEvent(
            eventId,
            sumBy(matchingIndexedEventGrams, "value"),
            sumBy(matchingIndexedEventGrams, "datetime_weighted_value"),
            matchingIndexedEventGrams.map((gram) => {
              if (gram.unstemmed_gram !== undefined) {
                return gram.unstemmed_gram;
              } else {
                return "";
              }
            }),
            matchingGramWithHighestValue.context_span || ""
          )
        );
      }
    });

    return compiledEvents;
  }
}
