const mongoose = require("mongoose");

const gameSchema = new mongoose.Schema({ timestamps: true });

module.exports = mongoose.model("Game", gameSchema);
