const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../utils/config");
const User = require("../models/user");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ConflictError = require("../errors/conflict-error");
const ForbiddenError = require("../errors/forbidden-error");
const {
  badRequestErrorMessage,
  conflictErrorMessage,
  castErrorMessage,
  notFoundErrorMessage,
  forbiddenErrorMessage,
  successDeleteUserMessage,
} = require("../utils/messages");
// const user = require("../models/user");

module.exports.createUser = (req, res, next) => {
  const { name, avatar, email, password } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (!email) {
        throw new BadRequestError(badRequestErrorMessage);
      }
      if (user) {
        throw new ConflictError(conflictErrorMessage);
      }

      return bcrypt.hash(password, 10);
    })
    .then((hash) =>
      User.create({
        name,
        avatar,
        email,
        password: hash,
      })
    )
    .then((user) => {
      res.send({ name: user.name, avatar: user.avatar, email: user.email });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(castErrorMessage));
      } else if (err.name === "ValidationError") {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  // findUserByCredentials is a function in models/user.js
  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, {
          expiresIn: "7d",
        }),
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(castErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, avatar },
    { new: true, runValidators: true }
  )
    .then((user) => {
      if (!user) {
        throw new NotFoundError(notFoundErrorMessage);
      }
      res.send({
        name: user.name,
        avatar: user.avatar,
        email: user.email,
        _id: user._id,
      });
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(castErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.deleteUser = (req, res, next) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => {
      if (user._id.str === req.user._id) {
        throw new ForbiddenError(forbiddenErrorMessage);
      }
      return user.deleteOne().then(() =>
        res.send({
          _id: userId,
          message: successDeleteUserMessage,
        })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError(castErrorMessage));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError(notFoundErrorMessage));
      } else {
        next(err);
      }
    });
};
