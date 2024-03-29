const {
  select
} = require("async");
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



exports.homePage = function (req, res, next) {
  res.render("home");
};


exports.gamePage = function (req, res, next) {
  res.render("game_normal", {
    params
  });
};

exports.adventurePage = function (req, res, next) {
  res.render("game_adventure");
};

exports.resultPage = function (req, res, next) {
  Game.
    find().
    where('user').equals(req.session.user).
    sort({
      time: -1
    }).
    select().
    limit(1).
    exec(function (err, game) {
      console.log(game);
      res.render("result", {
        result: game[0]
      });
    })



};



exports.preGame_trad = function (req, res, next) {
  Language.aggregate([{
    $group: {
      _id: null,
      language: {
        $addToSet: "$language"
      },
      difficulty: {
        $addToSet: "$difficulty"
      },
    },
  },]).exec(function (err, language) {
    let difficulty = [];

    //Without thoses lines, the difficulties aren't in order
    language[0]["difficulty"].forEach((element) => {
      difficulty[difficultyIndex[element]] = element;
    });

    res.render("pregame_normal", {
      currentUser: req.session.user,
      language: language[0]["language"],
      difficulty: difficulty,
      title: "Préparation de la partie"
    });
  });
};

exports.startGame = function (req, res, next) {
  params["language"] = req.body.language;
  params["difficulty"] = req.body.difficulty;

  console.log(params);

};

exports.gameGetNoun = function (req, res, next) {
  Noun.aggregate([{
    $sample: {
      size: req.body.quantity
    }
  },]).exec(function (err, language) {

    let noun = [];

    language.forEach(element => {
      noun.push(element['expression'])
    })

    console.log(noun);
    res.send(noun);
  });
};

exports.gameGetExpression = function (req, res, next) {

  Language.aggregate([{
    '$match': {
      'difficulty': req.body.difficulty,
      'language': req.body.language
    }
  }, {
    '$sample': {
      'size': req.body.quantity
    }
  }]).exec(function (err, test) {

    let language = [];

    test.forEach(element => {
      language.push(element['expression'])
    })

    console.log(language);
    res.json(language);
  });
};


exports.addGame = function (req, res, next) {

  let language, difficulty;
  
  if (req.body.type == "normal") {
    language = params['language']
    difficulty = params['difficulty']
  } else {
    language = "-"
    difficulty = "-"
  }

  let game = new Game({
    type: req.body.type,
    time: req.body.date,
    cpm: req.body.cpm,
    user: req.session.user[0],
    language: language,
    difficulty: difficulty,
    score: req.body.score,
    words: req.body.words,
    stats: req.body.stats
  })

  game.save(function (err) {
    if (err) throw err;
  })

  res.send({
    url: "/result"
  })
};


exports.detailsGame = function (req, res, next) {
  Game.
    findById(req.params.id).
    select().
    exec(function (err, game) {
      if (err) throw err;
      console.log(game);
      res.render('historyDetails', {
        title: "Detail de la partie",
        game: game,
        currentUser: req.session.user
      })
    })
};