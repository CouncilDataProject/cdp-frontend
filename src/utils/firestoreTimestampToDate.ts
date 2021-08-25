import { Timestamp } from "firebase/firestore";

/*
  Timestamp-typed objects stored in Firestore are not directly
  convertable to Javascript Date objects.  Therefore you must
  access the `seconds` property in the timestamp and convert it to a 
  unix timestamp.
*/

export default function (timestamp: Timestamp): Date {
  return new Date(timestamp.seconds * 1000);
}
