const GameInfo = require("../models/gameInfo");
const BadRequestError = require("../errors/bad-request-error");

module.exports.getGameInfo = (req, res, next) => {
  GameInfo.find({})
    .then((games) => {
      console.log(games);
      res.send({ data: games });
    })
    .catch(next);
};

module.exports.createGameInfo = (req, res, next) => {
  const { name, gamesPlayed, gamesWon, liked, description, user } = req.body;

  GameInfo.create({ name, gamesPlayed, gamesWon, user, liked, description })
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
  GameInfo.findById(gameId)
    .orFail()
    .then((game) => {
      console.log(game);
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
