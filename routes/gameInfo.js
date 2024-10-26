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
const { validateGameID } = require("../middlewares/validation");

gameInfoRouter.get("/", getGameInfo);
gameInfoRouter.post("/", auth, createGameInfo);
gameInfoRouter.put("/:gameId/likes", auth, likeGame);
gameInfoRouter.delete("/:gameId/likes", auth, dislikeGame);
gameInfoRouter.patch("/:gameId", auth, updateGamesPlayed);
gameInfoRouter.patch("/:gameId/won", auth, updateGamesWon);

module.exports = gameInfoRouter;
