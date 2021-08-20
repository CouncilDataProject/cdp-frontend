export class NetworkResponse {
  data?: any;
  error?: Error;

  constructor(data?: any, error?: Error) {
    this.data = data;
    this.error = error;
  }
}
