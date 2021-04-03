var Game = require("../models/game");

var Language = require("../models/language");
var Noun = require("../models/noun");

let difficultyIndex = {
  easy: 0,
  medium: 1,
  hard: 2,
};

let params = {
  language: null,
  difficulty: null,
};


exports.gamePage = function (req, res, next) {
  res.render("game_normal", { params });
};

exports.preGame_trad = function (req, res, next) {
  Language.aggregate([
    {
      $group: {
        _id: null,
        language: { $addToSet: "$language" },
        difficulty: { $addToSet: "$difficulty" },
      },
    },
  ]).exec(function (err, language) {
    let difficulty = [];

    //Without thoses lines, the difficulties aren't in order
    language[0]["difficulty"].forEach((element) => {
      difficulty[difficultyIndex[element]] = element;
    });

    res.render("pregame_normal", {
      currentUser: req.session.user,
      language: language[0]["language"],
      difficulty: difficulty,
    });
  });
};

exports.startGame = function (req, res, next) {
  params["language"] = req.body.language;
  params["difficulty"] = req.body.difficulty;
};

exports.gameGetNoun = function (req, res, next) {
  Noun.aggregate([
    {
      $sample: {size: req.body.quantity}
    },
  ]).exec(function (err, language) {

    let noun = [];

    language.forEach(element => {
      noun.push(element['expression'])
    })

    res.send(noun);
  });
};

exports.gameGetExpression = function (req, res, next) {
  console.log("test game expression");
  Language.aggregate([
    {
      $sample: {size:10}
    },
  ]).exec(function (err, test) {

    let language = [];

    test.forEach(element => {
      language.push(element['expression'])
    })

    console.log(language);
    res.json(language);
  });
};

//OPTIONEL - Fonction d'admin
exports.addGame = function (req, res, next) {
  res.send("NOT IMPLEMENTED: addGame: " + req.params.id);
};

exports.listGames = function (req, res, next) {
  res.send("NOT IMPLEMENTED: listGames: " + req.params.id);
};

exports.detailsGame = function (req, res, next) {
  res.send("NOT IMPLEMENTED: detailsGame: " + req.params.id);
};
