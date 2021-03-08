var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, maxlength: 25 },
  password: { type: String, required: true, maxlength: 25 },
  Admin: { type: Boolean, default: false },
  HighScore_trad: { type: Number, default: 0 },
  HighScore_adventure: { type: Number, default: 0 },
  FirstPlayed: { type: Date, default: Date.now() },
  LastPlayed: { type: Date },
  GamePlayed: { type: Number, default: 0 },
});

UserSchema.virtual("url").get(function () {
  return "/director/history/user/" + this._id;
});

UserSchema.virtual("timePlayed").get(function () {
  return this.LastPlayed - this.FirstPlayed;
});

//Export model
module.exports = mongoose.model("Users", UserSchema, "Users");
