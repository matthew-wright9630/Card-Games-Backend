const { SERVER_ISSUE } = require("../utils/errors");

module.exports = (err, req, res, next) => {
  const { statusCode = SERVER_ISSUE, message } = err;
  console.error(err);
  res.status(statusCode).send({
    message:
      statusCode === SERVER_ISSUE ? "An error occurred on the server" : message,
  });
};
