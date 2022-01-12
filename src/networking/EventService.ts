import {
  QueryConstraint,
  where,
  Timestamp,
  doc,
  orderBy,
  limit,
  startAfter,
} from "@firebase/firestore";

import { FirebaseConfig } from "../app/AppConfigContext";

import { NetworkService } from "./NetworkService";
import IndexedEventGramService from "./IndexedEventGramService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";
import { ORDER_DIRECTION, OR_QUERY_LIMIT_NUM, WHERE_OPERATOR } from "./constants";

import Event from "../models/Event";

import { createError } from "../utils/createError";

export interface RenderableEvent extends Event {
  keyGrams: string[];
  staticThumbnailURL: string;
  hoverThumbnailURL: string;
}

export default class EventService extends ModelService {
  indexedEventGramService: IndexedEventGramService;

  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Event, firebaseConfig);
    this.indexedEventGramService = new IndexedEventGramService(firebaseConfig);
  }

  async getEventById(eventId: string): Promise<Event> {
    const networkResponse = this.networkService.getDocument(
      eventId,
      COLLECTION_NAME.Event,
      new PopulationOptions([new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.EventBodyRef)])
    );
    return this.createModel(networkResponse, Event, `getEventById(${eventId})`) as Promise<Event>;
  }

  async getFullEventById(eventId: string): Promise<Event> {
    const networkResponse = this.networkService.getDocument(
      eventId,
      COLLECTION_NAME.Event,
      new PopulationOptions([
        new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.EventBodyRef),
        new Populate(COLLECTION_NAME.File, REF_PROPERTY_NAME.EventStaticThumbnailRef),
        new Populate(COLLECTION_NAME.File, REF_PROPERTY_NAME.EventHoverThumbnailRef),
      ])
    );

    return this.createModel(
      networkResponse,
      Event,
      `getFullEventById(${eventId})`
    ) as Promise<Event>;
  }

  async getEvents(
    batchSize: number,
    bodyIds: string[],
    dateRange: { start?: Date; end?: Date },
    sort: { by: string; order: ORDER_DIRECTION },
    startAfterEventDate?: Date
  ): Promise<Event[]> {
    if (bodyIds.length > 10) {
      // allow only <= 10 bodies filtering
      return Promise.reject(new Error(`Number of bodies exceeded ${OR_QUERY_LIMIT_NUM}.`));
    }

    const queryConstraints: QueryConstraint[] = [];

    if (bodyIds.length > 0) {
      const bodyDocRefs = bodyIds.map((bodyId) =>
        doc(NetworkService.getDb(), COLLECTION_NAME.Body, bodyId)
      );
      queryConstraints.push(where(REF_PROPERTY_NAME.EventBodyRef, WHERE_OPERATOR.in, bodyDocRefs));
    }

    if (dateRange.start) {
      const start = Timestamp.fromDate(dateRange.start);
      queryConstraints.push(where("event_datetime", WHERE_OPERATOR.gteq, start));
    }
    if (dateRange.end) {
      const endDate = new Date(dateRange.end);
      endDate.setDate(endDate.getDate() + 1);
      const end = Timestamp.fromDate(endDate);
      queryConstraints.push(where("event_datetime", WHERE_OPERATOR.lteq, end));
    }

    queryConstraints.push(orderBy(sort.by, sort.order));

    if (startAfterEventDate) {
      const startAfterDate = Timestamp.fromDate(startAfterEventDate);
      queryConstraints.push(startAfter(startAfterDate));
    }

    queryConstraints.push(limit(batchSize));

    const networkResponse = this.networkService.getDocuments(
      COLLECTION_NAME.Event,
      queryConstraints,
      new PopulationOptions([
        new Populate(COLLECTION_NAME.Body, REF_PROPERTY_NAME.EventBodyRef),
        new Populate(COLLECTION_NAME.File, REF_PROPERTY_NAME.EventStaticThumbnailRef),
        new Populate(COLLECTION_NAME.File, REF_PROPERTY_NAME.EventHoverThumbnailRef),
      ])
    );

    return this.createModels(
      networkResponse,
      Event,
      `getEvents([${bodyIds}], ${JSON.stringify(dateRange)}, ${JSON.stringify(sort)}, ${
        startAfterEventDate?.toISOString
      }})`
    ) as Promise<Event[]>;
  }

  async getRenderableEvent(event: Event): Promise<RenderableEvent> {
    try {
      const eventKeyGrams = await this.indexedEventGramService.getKeyGramsForEvent(
        `${COLLECTION_NAME.Event}/${event.id}`
      );
      // Unpack keygrams to get strings
      const keyGrams = eventKeyGrams.reduce((list, gram) => {
        if (gram.unstemmed_gram !== undefined) {
          list.push(gram.unstemmed_gram);
        }
        return list;
      }, [] as string[]);
      // Get https storage URLs
      const [staticThumbnailURL, hoverThumbnailURL] = await Promise.all(
        [event.static_thumbnail, event.hover_thumbnail].map((file) => {
          if (file) {
            return this.networkService.getDownloadUrl(file.uri);
          } else {
            return Promise.resolve("");
          }
        })
      );
      return Promise.resolve({
        ...event,
        keyGrams,
        staticThumbnailURL,
        hoverThumbnailURL,
      });
    } catch (err) {
      const error = createError(err);
      error.message = `eventService_getRenderableEvent(${JSON.stringify(event)})_${error.message}`;
      return Promise.reject(error);
    }
  }
}
