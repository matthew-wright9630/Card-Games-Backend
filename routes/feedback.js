const feedbackRouter = require("express").Router();
const { createFeedback } = require("../controllers/feedback");
const auth = require("../middlewares/auth");
const {
  validateFeedbackRequest,
} = require("../middlewares/validation");

feedbackRouter.post("/", validateFeedbackRequest, createFeedback);

module.exports = feedbackRouter;
