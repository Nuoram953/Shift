/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 07/03/21
*OBJECT: File for server. Running with node js and express js
*FICHIER: app.js
/*******************************************************************/

var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var fs = require("fs");
var csvToJson = require("convert-csv-to-json");
var bcrypt = require("bcrypt")

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var directorRouter = require("./routes/director");

var Language = require("./models/language");
var User = require("./models/user");

var app = express();

const saltRounds = 10;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));


app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/director", directorRouter);

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
  const language = "./assets/language";
  
  //Connection to BD
  let mongoDB = "mongodb://localhost/Shift";
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  });

  let db = mongoose.connection;

  
  //Checking if BD contains all csv files otherwise adding them to the collection "Language"
  let file = null;
  let json = null;
  fs.readdir(language, (err, files) => {
    files.forEach((file) => {
      file = file.split(".")[0];
      
      Language.
      find().
      where('language').equals(file).
      select('language').
      countDocuments().
      exec(function(err,document){
        if (err) throw err;

        if (document == 0){
          json = csvToJson.getJsonFromCsv(`./assets/language/${file}.csv`);
          db.collection('Language').insertMany(json, function (err, res){
            if (err) throw err;         
          })
        }

      })
      
    });
  });

  
  //If none User, add Admin for testing
  User.
  find().
  countDocuments().
  exec(function (err,users){
    if (err) throw err;

    if (users <= 0){

      bcrypt.genSalt(saltRounds, function(err, salt) {
        bcrypt.hash('admin', salt, function(err, hash) {
            // Store hash in your password DB.
            let admin = new User({username:'admin', password:hash,Admin:true})
            admin.save(function(err){
              if (err) throw err
            })
        });
      });


    }
  })

  db.on("error", console.error.bind(console, "MongoDB connection errors:"));
};

init();
