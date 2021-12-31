import { ResponseData } from "../networking/NetworkResponse";

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Model {}
export interface ModelConstructor {
  new (jsonData: ResponseData): Model;
}
