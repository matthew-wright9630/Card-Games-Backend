const Feedback = require("../models/feedback");
const BadRequestError = require("../errors/bad-request-error");
const { badRequestErrorMessage } = require("../utils/messages");

module.exports.createFeedback = (req, res, next) => {
  const { feedbackType, email, description, date } = req.body;

  Feedback.create({ feedbackType, email, description, date })
    .then(() => {
      res.send({ feedbackType: feedbackType });
    })
    .catch((err) => {
      console.log(err);
      if (err.name === "ValidationError") {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};
