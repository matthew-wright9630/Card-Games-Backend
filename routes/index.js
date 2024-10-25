const router = require("express").Router();

const NotFoundError = require("../errors/not-found-error");
const gameInfoRouter = require("./gameInfo");
const userRouter = require("./users");

router.use("/", userRouter);
router.use("/games", gameInfoRouter);

router.use(() => {
  throw new NotFoundError("Pathway does not exist");
});

module.exports = router;