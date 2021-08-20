enum COLLECTION_NAME {
  Person = "person",
}

enum REF_PROPERTY_NAME {
  PersonPictureRef = "picture_ref",
}

export class Populate {
  collectionName: string;
  refName: string;
  cascade?: PopulationOptions;

  constructor(
    collectionName: COLLECTION_NAME,
    refName: REF_PROPERTY_NAME,
    cascade: PopulationOptions
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
