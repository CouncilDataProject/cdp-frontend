import { removeStopwords } from "stopword";
import { nGram } from "n-gram";
import { stem } from "stemr";
import ModelService from "./ModelService";
import {
  COLLECTION_NAME,
  Populate,
  PopulationOptions,
  REF_PROPERTY_NAME,
} from "./PopulationOptions";
import Event from "../models/Event";
import IndexedEventGram from "../models/IndexedEventGram";

export default class EventSearchService extends ModelService {
  constructor() {
    super(COLLECTION_NAME.IndexedEventGram);
  }

  // # Create stemmed grams for query
  // query_terms = clean_text(query, clean_stop_words=True).split()
  // stemmed_grams = []
  // for n_gram_size in range(1, 3):
  //     grams = ngrams(query_terms, n_gram_size)
  //     for gram in grams:
  //         stemmed_grams.append(
  //              " ".join(stemmer.stem(term.lower()) for term in gram)
  //          )

  /**
   * cleanText function is almost a mirror of the `clean_text` function from
   * cdp-backend Python. Only major difference is there is no boolean parameter
   * for indicating if we want to clean stopwords, this function is only currently
   * used for searching and thus should always clean stopwords.
   *
   * Removes punctuation, line breaks, tabs, special character strings, stopwords,
   * and any extra spaces in string (2+ spaces become 1 space).
   *
   * Returns as an array of string instead of string to pass into ngrams
   */
  cleanText(query: string): string[] {
    // Replace new line and tab characters with a space
    let cleanedQuery = query.replace(/[\t\n]+/g, " ");

    // Replace common strings used by documents on backend
    // Not _really_ needed here but a nice safety measure to match the alg
    cleanedQuery = cleanedQuery.replace("--", " ");

    // Same as Python standard punctuation string
    cleanedQuery = cleanedQuery.replace(/['!"#$%&\\'()\*+,\-\.\/:;<=>?@\[\\\]\^_`{|}~']/g, "");

    // Remove extra spaces
    cleanedQuery = cleanedQuery.replace(/\s{2,}/g, " ");

    // Remove leading and trailing spaces
    try {
      if (cleanedQuery.startsWith(" ")) {
        cleanedQuery = cleanedQuery.substring(1);
      }
      if (cleanedQuery.endsWith(" ")) {
        cleanedQuery = cleanedQuery.slice(0, -1);
      }
    } catch {
      // Error can occur when query was cleaned but no characters remain
      return [];
    }

    // Remove stopwords
    return removeStopwords(cleanedQuery.split(" "));
  }

  getStemmedGrams(query: string): string[] {
    const cleanedQuery = this.cleanText(query);
    console.log("cleanedQuery", cleanedQuery);

    const stemmedGrams: string[] = [];
    Array.from([1, 2, 3]).forEach((nGramSize) => {
      console.log("nGramSize", nGramSize);

      const allGrams: string[][] = nGram(nGramSize)(cleanedQuery);
      allGrams.forEach((gramSet) => {
        stemmedGrams.push(
          gramSet
            .map((gram) => {
              return stem(gram);
            })
            .join(" ")
            .toLowerCase()
        );
      });
    });

    return stemmedGrams;
  }

  async searchEvents(query: string): Promise<Event[]> {
    console.log(this.getStemmedGrams(query));

    return [];
  }
}
