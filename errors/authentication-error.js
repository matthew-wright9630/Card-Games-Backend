const { AUTHENTICATION_ERROR } = require("../utils/errors");

class AuthenticationError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = AUTHENTICATION_ERROR;
  }
}

module.exports = AuthenticationError;
