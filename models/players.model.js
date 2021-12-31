const mongoose = require('mongoose');

const { Schema } = mongoose;

const playerSchema = new Schema(
  {
    name: { type: String, required: true },
    points: { type: Number, required: true },
    maxpoints: { type: Number, required: true },
  },
);

const Players = mongoose.model('Players', playerSchema);
module.exports = Players;
