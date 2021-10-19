import { where, doc } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import { COLLECTION_NAME, REF_PROPERTY_NAME } from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";
import { FirebaseConfig } from "../app/AppConfigContext";
import MatterSponsor from "../models/MatterSponsor";

export default class MatterSponsorService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.Role, firebaseConfig);
  }

  /*
  @param the id of the person
  @return all roles held by the person, ordered most-recent first
  */
  async getMattersSponsoredByPersonId(personId: string): Promise<MatterSponsor[]> {
    const networkQueryResponse = this.networkService.getDocuments(COLLECTION_NAME.Role, [
      where(
        REF_PROPERTY_NAME.MatterSponsorPersonRef,
        WHERE_OPERATOR.eq,
        doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
      ),
    ]);
    return this.createModels(
      networkQueryResponse,
      MatterSponsor,
      `getMattersSponsoredByPersonId(${personId})`
    );
  }
}
