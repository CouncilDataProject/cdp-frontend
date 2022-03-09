import { where, doc, QueryConstraint, orderBy, getDoc, startAfter } from "@firebase/firestore";

import { FirebaseConfig } from "../app/AppConfigContext";

import { NetworkService } from "./NetworkService";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  REF_PROPERTY_NAME,
  Populate,
  PopulationOptions,
} from "./PopulationOptions";
import { ORDER_DIRECTION, WHERE_OPERATOR } from "./constants";

import MatterSponsor from "../models/MatterSponsor";

export default class MatterSponsorService extends ModelService {
  constructor(firebaseConfig: FirebaseConfig) {
    super(COLLECTION_NAME.MatterSponsor, firebaseConfig);
  }

  /*
  @param the id of the person
  @return all MatterSponsors where the sponsor is personId's person
  */
  async getMattersSponsoredByPersonId(
    personId: string,
    batchSize: number,
    lastVisibleMatterSponsorId?: string
  ): Promise<MatterSponsor[]> {
    const populateMatter = new Populate(
      COLLECTION_NAME.Matter,
      REF_PROPERTY_NAME.MatterSponsorMatterRef
    );

    const queryConstraints: QueryConstraint[] = [];
    queryConstraints.push(
      where(
        REF_PROPERTY_NAME.MatterSponsorPersonRef,
        WHERE_OPERATOR.eq,
        doc(NetworkService.getDb(), COLLECTION_NAME.Person, personId)
      )
    );
    queryConstraints.push(orderBy(REF_PROPERTY_NAME.MatterSponsorMatterRef, ORDER_DIRECTION.asc));
    if (lastVisibleMatterSponsorId) {
      const docRef = doc(
        NetworkService.getDb(),
        COLLECTION_NAME.MatterSponsor,
        lastVisibleMatterSponsorId
      );
      const docSnap = await getDoc(docRef);
      queryConstraints.push(startAfter(docSnap));
    }

    const networkQueryResponse = this.networkService.getDocuments(
      COLLECTION_NAME.MatterSponsor,
      queryConstraints,
      new PopulationOptions([populateMatter])
    );
    return this.createModels(
      networkQueryResponse,
      MatterSponsor,
      `getMattersSponsoredByPersonId(${personId})`
    ) as Promise<MatterSponsor[]>;
  }
}
