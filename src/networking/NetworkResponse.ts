class ResponseData {
  [propName: string]: any;
}
class NetworkResponse {
  data?: ResponseData;
  error?: Error;

  constructor(data?: any, error?: Error) {
    this.data = data;
    this.error = error;
  }
}

export { ResponseData, NetworkResponse };
