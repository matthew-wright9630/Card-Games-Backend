const mongoose = require("mongoose");
const userSchema = require("./user");

const gameInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    maxlength: 50,
  },
  user: {
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: userSchema }],
  },
  gamesWon: {
    type: Number,
    required: true,
  },
  gamesPlayed: {
    type: Number,
    required: true,
  },
  liked: {
    type: Boolean,
    required: true,
  },
  description: {
    type: String,
    minlength: 10,
    maxlength: 1000,
    required: true,
  },
});

module.exports = mongoose.model("gameInfo", gameInfoSchema);
