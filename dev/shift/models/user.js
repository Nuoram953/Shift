var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var UserSchema = new Schema({
  username: { type: String, required: true, maxlength: 25,unique:true},
  password: { type: String, required: true, minlength:8},
  Admin: { type: Boolean, default: false },
  highScore_trad: { type: Number, default: 0 },
  highScore_adventure: { type: Number, default: 0 },
  date: { type:Date, default: Date.now()}
});


UserSchema.virtual("url").get(function () {
  return "/history/user/" + this._id;
});

UserSchema.virtual("timePlayed").get(function () {

  return parseInt((Date.now() - this.date) / (1000 * 60 * 60 * 24), 10); 

});

//Export model
module.exports = mongoose.model("Users", UserSchema, "Users");
