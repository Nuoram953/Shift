var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var NounSchema = new Schema({
    expression: { type: String, required: true}
});


//Export model
module.exports = mongoose.model("Noun", NounSchema, "Noun");
