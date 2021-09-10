class ResponseData {
  [propName: string]: any;
}

class NetworkResponse {
  data?: ResponseData;
  error?: Error;

  constructor(data?: ResponseData, error?: Error) {
    this.data = data;
    this.error = error;
  }
}

class NetworkQueryResponse {
  data?: ResponseData[];
  error?: Error | unknown;

  constructor(data?: ResponseData[], error?: Error) {
    this.data = data;
    this.error = error;
  }
}

class NoDocumentsError extends Error {
  constructor(collectionName: string) {
    super(`No documents found from querying ${collectionName}`);
    this.name = "NoDocumentsError";

    // Set the prototype explicitly.
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export { ResponseData, NetworkResponse, NetworkQueryResponse, NoDocumentsError };
