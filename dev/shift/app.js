/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 07/03/21
*OBJECT: File for server. Running with node js and express js
*FICHIER: app.js
/*******************************************************************/

var createError = require("http-errors");
var express = require("express");
var session = require("express-session");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var fs = require("fs");
var csvToJson = require("convert-csv-to-json");
var bcrypt = require("bcrypt");
var favicon = require('serve-favicon');

var directorRouter = require("./routes/director");

var Language = require("./models/language");
var User = require("./models/user");
var Noun = require("./models/noun");

var app = express();

const saltRounds = 10;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    maxAge: 24 * 60 * 60 * 1000
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({
  extended: false
}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use("/module", express.static(path.join(__dirname, "dist")));
app.use(favicon(path.join(__dirname, 'public', '/images/logo.png')))



app.use("/", directorRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;

/**
 * This function check for existing and missing language in the BD. Also, if none user, it add an admin for testing purposes.
 *
 */
const init = () => {
  const LANGUAGE = "./assets/language";

  //Connection to BD
  let mongoDB = "mongodb://localhost/Shift";
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });

  let db = mongoose.connection;

  //Checking if BD contains all csv languages files otherwise adding them to the collection "Language"
  fs.readdir(LANGUAGE, (err, files) => {
    files.forEach((file) => {
      file = file.split(".")[0];

      Language.find()
        .where("language").equals(file)
        .select("language")
        .countDocuments()
        .exec(function (err, document) {
          if (err) throw err;

          let json = csvToJson.getJsonFromCsv(`./assets/language/${file}.csv`);

          if (document != json.length) {
            db.collection("Language").deleteMany({ "language": file })
            db.collection("Language").insertMany(json, function (err, res) {
              if (err) throw err;
            });
          }
        });
    });
  });

  //If there is no user in db, add Admin account for testing
  //*When ready for release change default password for admin account
  User.find()
    .countDocuments()
    .exec(function (err, users) {
      if (err) throw err;

      if (users <= 0) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
          bcrypt.hash("admin", salt, function (err, hash) {
            let admin = new User({
              username: "admin",
              password: hash,
              Admin: true,
            });
            admin.save(function (err) {
              if (err) throw err;
            });
          });
        });
      }
    });

  db.on("error", console.error.bind(console, "MongoDB connection errors:"));


  Noun.find()
    .countDocuments()
    .exec(function (err, noun) {
      if (noun == 0) {
        json = csvToJson.getJsonFromCsv(`./assets/noun/Noun.csv`);
        db.collection("Noun").insertMany(json, function (err, result) {
          if (err) throw err;
        })
      }
    })



};

init();