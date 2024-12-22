class ApiResponse {
  constructor(statusCode, message = "Sucess", data) {
    this.statusCode = statusCode;
    this.message = message;
    this.data = data;
  }
}

export { ApiResponse };
