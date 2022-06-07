import ModelService from "./ModelService";
import { where, orderBy, doc } from "@firebase/firestore";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";
import { ORDER_DIRECTION, WHERE_OPERATOR } from "./constants";
import { NetworkService } from "./NetworkService";

import MatterStatus from "../models/MatterStatus";
import { FirebaseConfig } from "../app/AppConfigContext";

export default class MatterStatusService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.MatterStatus, firebaseConfig);
  }

  async getMatterStatusesByMatterId(matterId: string): Promise<MatterStatus[]> {
    const populateEventMinutesItems = new Populate(
      COLLECTION_NAME.MatterStatus,
      REF_PROPERTY_NAME.MatterStatusEventMinutesItemRef
    );

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.MatterStatus,
      [
        where(
          REF_PROPERTY_NAME.MatterStatusMatterRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Matter, matterId)
        ),
        orderBy("update_datetime", ORDER_DIRECTION.desc),
      ],
      new PopulationOptions([populateEventMinutesItems])
    );
    return this.createModels(
      networkQueryResponse,
      MatterStatus,
      `getMatterStatusByMatterId(${matterId})`
    ) as Promise<MatterStatus[]>;
  }
}
