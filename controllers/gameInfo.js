const GameInfo = require("../models/gameInfo");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");
const ForbiddenError = require("../errors/forbidden-error");
const {
  badRequestErrorMessage,
  castErrorMessage,
  notFoundErrorMessage,
  forbiddenErrorMessage,
  successDeleteGameInfoMessage,
} = require("../utils/messages");

module.exports.getGameInfo = (req, res, next) => {
  GameInfo.find()
    .then((games) => {
      res.send({ data: games });
    })
    .catch(next);
};

module.exports.createGameInfo = (req, res, next) => {
  const { name, gamesPlayed, gamesWon, liked, description, owner } = req.body;

  GameInfo.create({
    name,
    gamesPlayed,
    gamesWon,
    owner,
    liked,
    description,
  })
    .then((game) => {
      res.send(game);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError(badRequestErrorMessage));
      } else {
        next(err);
      }
    });
};

module.exports.updateGamesPlayed = (req, res, next) => {
  const { gameId } = req.params;
  GameInfo.updateOne({ _id: gameId }, { $inc: { gamesPlayed: 1 } })
    .orFail()
    .then((game) => {
      res.send(game);
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

module.exports.updateGamesWon = (req, res, next) => {
  const { gameId } = req.params;
  GameInfo.updateOne({ _id: gameId }, { $inc: { gamesWon: 1 } })
    .orFail()
    .then((game) => {
      res.send(game);
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

module.exports.likeGame = (req, res, next) => {
  const { gameId } = req.params;
  GameInfo.findByIdAndUpdate(
    gameId,
    { liked: true },
    { new: true, runValidators: true }
  )
    .then((game) => {
      res.send(game);
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

module.exports.dislikeGame = (req, res, next) => {
  const { gameId } = req.params;
  GameInfo.findByIdAndUpdate(
    gameId,
    { liked: false },
    { new: true, runValidators: true }
  )
    .then((game) => {
      res.send(game);
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

module.exports.deleteGameInfo = (req, res, next) => {
  console.log(req.body, "BODY OF REQUEST");
  const { gameId } = req.params;
  GameInfo.findById(gameId)
    .orFail()
    .then((game) => {
      console.log(game.owner, req.user._id);
      if (String(game.owner) !== req.user._id) {
        throw new ForbiddenError(forbiddenErrorMessage);
      }
      return game.deleteOne().then(() =>
        res.send({
          _id: gameId,
          message: successDeleteGameInfoMessage,
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
