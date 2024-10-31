const gameInfoRouter = require("express").Router();
const {
  getGameInfo,
  updateGamesPlayed,
  createGameInfo,
  likeGame,
  dislikeGame,
  updateGamesWon,
  deleteGameInfo,
} = require("../controllers/gameInfo");
const auth = require("../middlewares/auth");
const {
  validateGameId,
  validateGameInfoCreation,
} = require("../middlewares/validation");

gameInfoRouter.get("/:userId", getGameInfo);
gameInfoRouter.post("/", auth, validateGameInfoCreation, createGameInfo);
gameInfoRouter.put("/:gameId/likes", validateGameId, auth, likeGame);
gameInfoRouter.delete("/:gameId/likes", validateGameId, auth, dislikeGame);
gameInfoRouter.patch("/:gameId", auth, validateGameId, updateGamesPlayed);
gameInfoRouter.patch("/:gameId/won", auth, validateGameId, updateGamesWon);
gameInfoRouter.delete("/:gameId", auth, validateGameId, deleteGameInfo);

module.exports = gameInfoRouter;
