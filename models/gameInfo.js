const mongoose = require("mongoose");
const userSchema = require("./user");

const gameInfoSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    enum: ["Solitaire", "War"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  gamesWon: {
    type: Number,
    required: true,
    default: 0,
  },
  gamesPlayed: {
    type: Number,
    required: true,
    default: 0,
  },
  liked: {
    type: Boolean,
    default: false,
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
