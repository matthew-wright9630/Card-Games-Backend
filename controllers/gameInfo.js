const GameInfo = require("../models/gameInfo");
const BadRequestError = require("../errors/bad-request-error");
const NotFoundError = require("../errors/not-found-error");

module.exports.getGameInfo = (req, res, next) => {
  const owner = req.params.userId;
  GameInfo.find({ owner })
    .then((games) => {
      res.send({ data: games });
    })
    .catch(next);
};

module.exports.createGameInfo = (req, res, next) => {
  const { name, gamesPlayed, gamesWon, liked, description, owner } = req.body;

  GameInfo.create({ name, gamesPlayed, gamesWon, owner, liked, description })
    .then((game) => {
      res.send(game);
    })
    .catch((err) => {
      if (err.name === "ValidationError") {
        next(new BadRequestError("Invalid data"));
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
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
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
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
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
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
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
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};

module.exports.deleteGameInfo = (req, res, next) => {
  const { gameId } = req.params;
  console.log(req.params, "GAMEID!!!!!!!!");
  GameInfo.findById(gameId)
    .orFail()
    .then((game) => {
      console.log(game, "GAME!!!!!!!!!!!!!!!!!!!!!!!!!!!");
      if (game.owner.str === req.user._id) {
        throw new ForbiddenError("You do not have permission for this action");
      }
      return game.deleteOne().then(() =>
        res.send({
          _id: gameId,
          message: "Game information has been successfully deleted",
        })
      );
    })
    .catch((err) => {
      if (err.name === "CastError") {
        next(new BadRequestError("The id string is in an invalid format"));
      } else if (err.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else {
        next(err);
      }
    });
};
