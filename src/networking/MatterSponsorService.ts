import { where, doc } from "@firebase/firestore";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  REF_PROPERTY_NAME,
  Populate,
  PopulationOptions,
} from "./PopulationOptions";
import { WHERE_OPERATOR } from "./constants";
import { FirebaseConfig } from "../app/AppConfigContext";
import MatterSponsor from "../models/MatterSponsor";

export default class MatterSponsorService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.MatterSponsor, firebaseConfig);
  }

  /*
  @param the id of the person
  @return all MatterSponsors where the sponsor is personId's person
  */
  async getMattersSponsoredByPersonId(personId: string): Promise<MatterSponsor[]> {
    const populateMatter = new Populate(
      COLLECTION_NAME.Matter,
      REF_PROPERTY_NAME.MatterSponsorMatterRef
    );

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.MatterSponsor,
      [
        where(
          REF_PROPERTY_NAME.MatterSponsorPersonRef,
          WHERE_OPERATOR.eq,
          doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
        ),
      ],
      new PopulationOptions([populateMatter])
    );
    return this.createModels(
      networkQueryResponse,
      MatterSponsor,
      `getMattersSponsoredByPersonId(${personId})`
    ) as Promise<MatterSponsor[]>;
  }
}
