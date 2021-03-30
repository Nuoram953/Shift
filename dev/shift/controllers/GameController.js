var Game = require("../models/game");

var Language = require("../models/language");

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
    console.log(language[0]['language']);
    res.render("pregame_normal", {
      currentUser: req.session.user,
      language: language[0]['language'],
      difficulty:language[0]['difficulty']
    });
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
