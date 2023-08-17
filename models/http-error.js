class HttpError extends Error {
  constructor(message, errorCode) {
    super(message); //añadira una propiedad al objeto llamada "message"
    this.code = errorCode;
  }
}

module.exports = HttpError;
