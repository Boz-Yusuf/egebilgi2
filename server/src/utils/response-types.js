class response {
  constructor(data, errors, message, status) {
    this.data = data;
    this.errors = errors;
    this.message = message;
    this.statues = status;
  }
}

class emptyResponse {
  constructor(errors, message, status) {
    this.errors = errors;
    this.message = message;
    this.statues = status;
  }
}

module.exports = {
  response,
  emptyResponse,
};
