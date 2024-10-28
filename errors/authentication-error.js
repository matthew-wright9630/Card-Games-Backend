const { AUTHENTICATION_ERROR } = require("../utils/errors");

class AuthentincationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHENTICATION_ERROR;
  }
}

module.exports = AuthentincationError;
