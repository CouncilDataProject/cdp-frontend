import IndexedMatterGram from "../../models/IndexedMatterGram";
import { basicMatter } from "./matter";

const basicIndexMatterGram: IndexedMatterGram = {
  id: "test-basicIndexMatterGram",
  matter_ref: "ref_to_test_event",
  matter: basicMatter,
  unstemmed_gram: "housing",
  stemmed_gram: "hous",
  context_span: "We believe that housing should be affordable.",
  value: 1.23,
  datetime_weighted_value: 1.234,
};

const rentBasicMatterGram: IndexedMatterGram = {
  id: "test-basicIndexMatterGram",
  matter_ref: "ref_to_test_event",
  matter: basicMatter,
  unstemmed_gram: "rent",
  stemmed_gram: "ren",
  context_span: "The rent is too damn high.",
  value: 1.23,
  datetime_weighted_value: 1.234,
};

export { basicIndexMatterGram, rentBasicMatterGram };
