import { FirebaseConfig } from "../app/AppConfigContext";
import { NetworkResponse, NetworkQueryResponse } from "./NetworkResponse";
import { NetworkService } from "./NetworkService";
import validateResponseData from "../models/util/validateResponseData";

import { ModelConstructor, Model } from "../models/Model";

import { createError } from "../utils/createError";
import { NoDocumentsError } from "./NetworkResponse";
import { COLLECTION_NAME } from "./PopulationOptions";

export default class ModelService {
  networkService: NetworkService;
  private modelName: COLLECTION_NAME;
  private serviceName: string;

  constructor(modelName: COLLECTION_NAME, firebaseConfig: FirebaseConfig) {
    this.networkService = NetworkService.getInstance(
      firebaseConfig.options,
      firebaseConfig.settings
    );
    this.modelName = modelName;
    const modelNamePascalCase = modelName
      .split("_")
      .map((el) => el[0].toUpperCase() + el.slice(1))
      .join("");
    this.serviceName = `${modelNamePascalCase}Service`;
  }

  async createModel(
    networkResponse: Promise<NetworkResponse>,
    model: ModelConstructor,
    methodName: string
  ): Promise<Model> {
    try {
      const { data, error } = await networkResponse;

      if (error) {
        throw error;
      }

      if (!data) {
        throw new Error(`No ${this.modelName} found.`);
      }

      const validationError = validateResponseData(data, this.modelName);
      if (validationError) {
        throw validationError;
      }

      return Promise.resolve(new model(data));
    } catch (err) {
      const error = createError(err);
      error.message = `${this.serviceName}_${methodName}_${error.message}`;
      return Promise.reject(error);
    }
  }

  async createModels(
    networkQueryResponse: Promise<NetworkQueryResponse>,
    model: ModelConstructor,
    methodName: string
  ): Promise<Model[]> {
    try {
      const { data, error } = await networkQueryResponse;

      if (error) {
        if (error instanceof NoDocumentsError) {
          return Promise.resolve([]);
        } else {
          throw error;
        }
      }

      if (!data || data.length === 0) {
        throw new Error(`No ${this.modelName}s found.`);
      }

      const models = data.map((datum) => {
        const validationError = validateResponseData(datum, this.modelName);
        if (validationError) {
          throw validationError;
        }
        return new model(datum);
      });

      return Promise.resolve(models);
    } catch (err) {
      const error = createError(err);
      error.message = `${this.serviceName}_${methodName}_${error.message}`;
      return Promise.reject(error);
    }
  }
}
