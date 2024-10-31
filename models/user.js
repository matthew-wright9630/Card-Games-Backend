const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const BadRequestError = require("../errors/bad-request-error");
const AuthenticationError = require("../errors/authentication-error");
const {
  authenticationErrorMessage,
  badRequestErrorMessage,
  avatarValidityMessage,
  emailValidityMessage,
} = require("../utils/messages");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: avatarValidityMessage,
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: emailValidityMessage,
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (password === undefined || email === undefined) {
        throw new BadRequestError(badRequestErrorMessage);
      }
      if (!user) {
        throw new AuthenticationError(authenticationErrorMessage);
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          throw new AuthenticationError(authenticationErrorMessage);
        }

        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
