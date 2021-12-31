import { ResponseData } from "../../networking/NetworkResponse";
import { COLLECTION_NAME } from "../../networking/PopulationOptions";

function getRequiredProperties(forCollection: COLLECTION_NAME): string[] {
  switch (forCollection) {
    case COLLECTION_NAME.Body:
      return ["id", "is_active", "start_datetime", "name"];
    case COLLECTION_NAME.Event:
      return ["id", "body_ref", "event_datetime"];
    case COLLECTION_NAME.EventMinutesItem:
      return ["id", "event_ref", "index", "minutes_item_ref"];
    case COLLECTION_NAME.EventMinutesItemFile:
      return ["id", "event_minutes_item_ref", "name", "uri"];
    case COLLECTION_NAME.File:
      return ["id", "name", "uri"];
    case COLLECTION_NAME.IndexedEventGram:
      return [
        "id",
        "context_span",
        "datetime_weighted_value",
        "event_ref",
        "stemmed_gram",
        "unstemmed_gram",
        "value",
      ];
    case COLLECTION_NAME.Matter:
      return ["id", "matter_type", "name", "title"];
    case COLLECTION_NAME.MatterFile:
      return ["id", "matter_ref", "name", "uri"];
    case COLLECTION_NAME.MatterSponsor:
      return ["id", "matter_ref", "person_ref"];
    case COLLECTION_NAME.MatterStatus:
      return ["id", "matter_ref", "status", "update_datetime"];
    case COLLECTION_NAME.MinutesItem:
      return ["id", "name"];
    case COLLECTION_NAME.Person:
      return ["id", "is_active", "name", "router_string"];
    case COLLECTION_NAME.Role:
      return ["id", "start_datetime", "title", "person_ref", "seat_ref"];
    case COLLECTION_NAME.Seat:
      return ["id", "name"];
    case COLLECTION_NAME.Session:
      return ["id", "event_ref", "session_datetime", "session_index", "video_uri"];
    case COLLECTION_NAME.Transcript:
      return ["id", "confidence", "created", "generator", "file_ref", "session_ref"];
    case COLLECTION_NAME.TranscriptJSON:
      return ["confidence", "generator", "created_datetime", "sentences"];
    case COLLECTION_NAME.Vote:
      return ["id", "event_minutes_item_ref", "event_ref", "matter_ref", "person_ref", "decision"];
  }
}

export default function (
  responseData: ResponseData,
  modelName: COLLECTION_NAME
): Error | undefined {
  try {
    // the model must have all its required properties or the ResponseData being used to generate it will be invalid
    const requiredProperties = getRequiredProperties(modelName);

    const requiredPropertiesUnfulfilled = requiredProperties.filter((property) => {
      return !responseData.hasOwnProperty(property);
    });
    if (requiredPropertiesUnfulfilled.length > 0) {
      throw new Error(`Missing properties: ${JSON.stringify(requiredPropertiesUnfulfilled)}`);
    } else {
      return; // there is no error, the JSON has been validated
    }
  } catch (error) {
    if (error instanceof Error) {
      error.message = `validateResponseData_${error.message}`;
      return error;
    } else {
      return new Error(`validateResponseData_somehow threw a incorrectly-typed error`);
    }
  }
}
