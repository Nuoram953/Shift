var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var GameSchema = new Schema({
  type: { type: String, enum: ["adventure", "normal"] },
  time: { type: Date, defaut: Date.now() },
  cpm: { type: Number },
  user: { type: Schema.Types.ObjectId, ref: "Users", required: true },
  language: { type: String },
  difficulty:{type: String},
  score: { type: Number, default: 0 },
  words: { type: Array },
  error:{type:Number},
  stats: { type: Object },

});

//Export model
module.exports = mongoose.model("Game", GameSchema, "Game");
