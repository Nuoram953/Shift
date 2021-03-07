var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var fs = require("fs");
var csvToJson = require("convert-csv-to-json");

var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
var directorRouter = require("./routes/director");

var Language = require("./models/language");

var app = express();

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

const init = () => {
  const language = "./assets/language";
  //Connection to BD
  let mongoDB = "mongodb://localhost/Shift";
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  let db = mongoose.connection;

  //Checking if csv files are in BD otherwise they're imported
  let file = null;
  let json = null;
  let query = null;
  fs.readdir(language, (err, files) => {
    files.forEach((file) => {
      file = file.split(".")[0];
      json = csvToJson.getJsonFromCsv(`./assets/language/${file}.csv`);

      Language.
      find().
      where('language').equals(file).
      select('language').
      countDocuments().
      exec(function(err,document){
        if (err) throw err;
        console.log(document);

        if (document == 0){
          db.collection('Language').insertMany(json, function (err, res){
            if (err) throw err;
            console.log(`Number of documents inserted:${res.insertedCount}`);
          })
        }

      })
      
    });
  });

  db.on("error", console.error.bind(console, "MongoDB connection errors:"));
};

init();
