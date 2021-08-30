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
  error?: Error;

  constructor(data?: ResponseData[], error?: Error) {
    this.data = data;
    this.error = error;
  }
}

export { ResponseData, NetworkResponse, NetworkQueryResponse };
