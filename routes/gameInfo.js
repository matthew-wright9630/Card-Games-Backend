const gameInfoRouter = require("express").Router();
const {
  getGameInfo,
  updateGamesPlayed,
  createGameInfo,
  likeGame,
  dislikeGame,
  updateGamesWon,
} = require("../controllers/gameInfo");
const auth = require("../middlewares/auth");
const {
  validateUserId,
  validateGameId,
  validateGameInfoCreation,
} = require("../middlewares/validation");

gameInfoRouter.get("/:userId", validateUserId, getGameInfo);
gameInfoRouter.post("/", auth, validateGameInfoCreation, createGameInfo);
gameInfoRouter.put("/:gameId/likes", validateGameId, auth, likeGame);
gameInfoRouter.delete("/:gameId/likes", validateGameId, auth, dislikeGame);
gameInfoRouter.patch("/:gameId", auth, validateGameId, updateGamesPlayed);
gameInfoRouter.patch("/:gameId/won", auth, validateGameId, updateGamesWon);

module.exports = gameInfoRouter;
