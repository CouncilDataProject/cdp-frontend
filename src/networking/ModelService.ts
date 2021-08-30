import { NetworkResponse, NetworkQueryResponse } from "./NetworkResponse";
import { NetworkService } from "./NetworkService";

import { ModelConstructor, Model } from "../models/Model";

export default class ModelService {
  networkService: NetworkService;
  private modelName: string;
  private serviceName: string;

  constructor(modelName: string, serviceName: string) {
    this.networkService = NetworkService.getInstance();
    this.modelName = modelName;
    this.serviceName = serviceName;
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
    } catch (error) {
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
    } catch (error) {
      error.message = `${this.serviceName}_${methodName}_${error.message}`;
      return Promise.reject(error);
    }
  }
}
