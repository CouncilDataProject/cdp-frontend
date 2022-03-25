import { orderBy } from "firebase/firestore";
import ModelService from "./ModelService";
import Seat from "../models/Seat";
import { COLLECTION_NAME } from "./PopulationOptions";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class SeatService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Seat, firebaseConfig);
  }

  async getAllSeats(): Promise<Seat[]> {
    const networkResponse = this.networkService.getDocuments(COLLECTION_NAME.Seat, [
      orderBy("name"),
    ]);

    return this.createModels(networkResponse, Seat, `getAllSeats`) as Promise<Seat[]>;
  }
}
