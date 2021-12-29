export enum COLLECTION_NAME {
  Body = "body",
  Event = "event",
  EventMinutesItem = "event_minutes_item",
  EventMinutesItemFile = "event_minutes_item_file",
  File = "file",
  IndexedEventGram = "indexed_event_gram",
  Matter = "matter",
  MatterFile = "matter_file",
  MatterSponsor = "matter_sponsor",
  MatterStatus = "matter_status",
  MinutesItem = "minutes_item",
  Person = "person",
  Role = "role",
  Seat = "seat",
  Session = "session",
  Transcript = "transcript",
  Vote = "vote",
}

export enum REF_PROPERTY_NAME {
  EventBodyRef = "body_ref",
  EventHoverThumbnailRef = "hover_thumbnail_ref",
  EventStaticThumbnailRef = "static_thumbnail_ref",
  EventMinutesItemEventRef = "event_ref",
  EventMinutesItemMinutesItemRef = "minutes_item_ref",
  EventMinutesItemFileEventMinutesItemRef = "event_minutes_item_ref",
  IndexedEventGramEventRef = "event_ref",
  MatterFileMatterRef = "matter_ref",
  MatterStatusEventMinutesItemRef = "event_minutes_item_ref",
  MatterStatusMatterRef = "matter_ref",
  MatterSponsorMatterRef = "matter_ref",
  MatterSponsorPersonRef = "person_ref",
  MinutesItemMatterRef = "matter_ref",
  PersonPictureRef = "picture_ref",
  RoleBodyRef = "body_ref",
  RolePersonRef = "person_ref",
  RoleSeatRef = "seat_ref",
  SeatImageRef = "image_ref",
  SessionEventRef = "event_ref",
  TranscriptFileRef = "file_ref",
  TranscriptSessionRef = "session_ref",
  VoteEventMinutesItemRef = "event_minutes_item_ref",
  VoteEventRef = "event_ref",
  VoteMatterRef = "matter_ref",
  VotePersonRef = "person_ref",
}

export function getCollectionForReference(reference: string): COLLECTION_NAME | undefined {
  switch (reference) {
    case REF_PROPERTY_NAME.EventBodyRef:
      return COLLECTION_NAME.Body;
    case REF_PROPERTY_NAME.EventHoverThumbnailRef:
      return COLLECTION_NAME.File;
    case REF_PROPERTY_NAME.EventStaticThumbnailRef:
      return COLLECTION_NAME.File;
    case REF_PROPERTY_NAME.EventMinutesItemEventRef:
      return COLLECTION_NAME.Event;
    case REF_PROPERTY_NAME.EventMinutesItemMinutesItemRef:
      return COLLECTION_NAME.MinutesItem;
    case REF_PROPERTY_NAME.EventMinutesItemFileEventMinutesItemRef:
      return COLLECTION_NAME.EventMinutesItem;
    case REF_PROPERTY_NAME.IndexedEventGramEventRef:
      return COLLECTION_NAME.Event;
    case REF_PROPERTY_NAME.MatterFileMatterRef:
      return COLLECTION_NAME.Matter;
    case REF_PROPERTY_NAME.MatterStatusEventMinutesItemRef:
      return COLLECTION_NAME.EventMinutesItem;
    case REF_PROPERTY_NAME.MatterStatusMatterRef:
      return COLLECTION_NAME.Matter;
    case REF_PROPERTY_NAME.MatterSponsorMatterRef:
      return COLLECTION_NAME.Matter;
    case REF_PROPERTY_NAME.MatterSponsorPersonRef:
      return COLLECTION_NAME.Person;
    case REF_PROPERTY_NAME.MinutesItemMatterRef:
      return COLLECTION_NAME.Matter;
    case REF_PROPERTY_NAME.PersonPictureRef:
      return COLLECTION_NAME.File;
    case REF_PROPERTY_NAME.RoleBodyRef:
      return COLLECTION_NAME.Body;
    case REF_PROPERTY_NAME.RolePersonRef:
      return COLLECTION_NAME.Person;
    case REF_PROPERTY_NAME.RoleSeatRef:
      return COLLECTION_NAME.Seat;
    case REF_PROPERTY_NAME.SeatImageRef:
      return COLLECTION_NAME.File;
    case REF_PROPERTY_NAME.SessionEventRef:
      return COLLECTION_NAME.Event;
    case REF_PROPERTY_NAME.TranscriptFileRef:
      return COLLECTION_NAME.File;
    case REF_PROPERTY_NAME.TranscriptSessionRef:
      return COLLECTION_NAME.Session;
    case REF_PROPERTY_NAME.VoteEventMinutesItemRef:
      return COLLECTION_NAME.MinutesItem;
    case REF_PROPERTY_NAME.VoteEventRef:
      return COLLECTION_NAME.Event;
    case REF_PROPERTY_NAME.VoteMatterRef:
      return COLLECTION_NAME.Matter;
    case REF_PROPERTY_NAME.VotePersonRef:
      return COLLECTION_NAME.Person;
    default:
      return;
  }
}

export class Populate {
  collectionName: string;
  refName: string;
  cascade?: PopulationOptions;

  constructor(
    collectionName: COLLECTION_NAME,
    refName: REF_PROPERTY_NAME,
    cascade?: PopulationOptions
  ) {
    this.collectionName = collectionName;
    this.refName = refName;
    this.cascade = cascade;
  }
}

export class PopulationOptions {
  toPopulate?: Populate[];

  constructor(populate?: Populate[]) {
    this.toPopulate = populate;
  }
}
