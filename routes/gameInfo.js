const gameInfoRouter = require("express").Router();
const {
  getGameInfo,
  updateGamesPlayed,
  createGameInfo,
} = require("../controllers/gameInfo");
const auth = require("../middlewares/auth");
const { validateGameID } = require("../middlewares/validation");

gameInfoRouter.get("/", getGameInfo);
gameInfoRouter.post("/", auth, createGameInfo);

module.exports = gameInfoRouter;
