/*
  matter?: Matter;
  matter_ref?: string;
  person?: Person;
  person_ref?: string;
  external_source_id?: string;
*/
import { basicMatter } from "./matter";
const basicMatterSponsor = {
  matter: undefined,
  matter_ref: "basicMatterSponsor matter ref id",
  person: undefined,
  person_ref: "basicMatterSponsor person ref id",
  external_source_id: "basicMatterSponsor external source id",
};

const populatedMatterMatterSponsor = {
  matter: basicMatter,
  matter_ref: "populatedMatterMatterSponsor matter ref id",
  person: undefined,
  person_ref: "populatedMatterMatterSponsor person ref id",
  external_source_id: "populatedMatterMatterSponsor external source id",
};

export { basicMatterSponsor, populatedMatterMatterSponsor };
