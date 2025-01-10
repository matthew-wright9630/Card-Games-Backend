const mongoose = require("mongoose");
const validator = require("validator");
const { emailValidityMessage } = require("../utils/messages");

const feedbackSchema = new mongoose.Schema({
  feedbackType: {
    type: String,
    enum: ["recommendation", "bug"],
    required: true,
  },
  email: {
    type: String,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: emailValidityMessage,
    },
  },
  description: {
    type: String,
    minLength: 10,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
});

module.exports = mongoose.model("feedback", feedbackSchema);
