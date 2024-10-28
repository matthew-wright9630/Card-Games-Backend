const userRoutes = require("express").Router();
const {
  createUser,
  login,
  getCurrentUser,
  updateUser,
  deleteUser,
} = require("../controllers/users");
const auth = require("../middlewares/auth");
const {
  validateUserSignUp,
  validateUserSignIn,
  validateUpdateUser,
  validateUserId,
} = require("../middlewares/validation");

userRoutes.post("/signup", validateUserSignUp, createUser);
userRoutes.post("/signin", validateUserSignIn, login);

userRoutes.get("/users/me", auth, getCurrentUser);
userRoutes.patch("/users/me", auth, validateUpdateUser, updateUser);
userRoutes.delete("/users/:userId", auth, validateUserId, deleteUser);

module.exports = userRoutes;
