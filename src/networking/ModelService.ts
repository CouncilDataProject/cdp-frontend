import { FirebaseConfig } from "../app/AppConfigContext";
import { NetworkResponse, NetworkQueryResponse } from "./NetworkResponse";
import { NetworkService } from "./NetworkService";

import { ModelConstructor, Model } from "../models/Model";

import { createError } from "../utils/createError";

export default class ModelService {
  networkService: NetworkService;
  private modelName: string;
  private serviceName: string;

  constructor(modelName: string, firebaseConfig: FirebaseConfig) {
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
        throw error;
      }

      if (!data || data.length === 0) {
        throw new Error(`No ${this.modelName}s found.`);
      }

      const models = data.map((datum) => new model(datum));
      return Promise.resolve(models);
    } catch (err) {
      const error = createError(err);
      error.message = `${this.serviceName}_${methodName}_${error.message}`;
      return Promise.reject(error);
    }
  }
}
