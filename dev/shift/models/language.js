var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var LanguageSchema = new Schema({
  expression: { type: String, required: true },
  difficulty: {
    type: String,
    required: true,
  },
  language: { type: String, required: true },
});

//Export model
module.exports = mongoose.model("Language", LanguageSchema, "Language");
