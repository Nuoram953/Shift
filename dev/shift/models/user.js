var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, maxlength: 25,unique:true},
  password: { type: String, required: true, minlength:8},
  Admin: { type: Boolean, default: false },
  highScore_trad: { type: Number, default: 0 },
  highScore_adventure: { type: Number, default: 0 },
});


UserSchema.virtual("url").get(function () {
  return "/director/history/user/" + this._id;
});

UserSchema.virtual("timePlayed").get(function () {
  return this.LastPlayed - this.FirstPlayed;
});

//Export model
module.exports = mongoose.model("Users", UserSchema, "Users");
