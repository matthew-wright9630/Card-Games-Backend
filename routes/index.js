const router = require("express").Router();

const NotFoundError = require("../errors/not-found-error");
const userRouter = require("./users");
const gameInfoRouter = require("./gameInfo");
const feedbackRouter = require("./feedback");

router.use("/", userRouter);
router.use("/games", gameInfoRouter);
router.use("/feedback", feedbackRouter);

router.use(() => {
  throw new NotFoundError("Pathway does not exist");
});

module.exports = router;
