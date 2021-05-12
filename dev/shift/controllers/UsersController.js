/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 2021-05-12 10:52:01
*OBJECT: Manage everything related to user. Display pages and retrives informations from mongoDB
*FICHIER: UserController.js
/*******************************************************************/

var User = require('../models/user');
var Game = require('../models/game');
var Language = require("../models/language");

var mongoose = require("mongoose");
var bcrypt = require('bcrypt');
var async = require('async');

const saltRounds = 10;

const ERROR = {
    001: "",
    002: "Mauvais mot de passe",
    003: "Mauvais nom d'utilisateur et mot de passe",
    004: "Nom d'utilisateur est déjà existant",
    005: "Les informations ne sont pas valides"
};


exports.indexPage = function (req, res, next) {
    {
        Language.aggregate([{
            $group: {
                _id: null,
                language: {
                    $addToSet: "$language"
                },
            },
        },]).exec(function (err, data) {

            res.render('index', {
                title: 'Shift',
                language: data[0].language
            });
        })
    }
}

exports.loginPage = function (req, res, next) {
    res.render('login', {
        title: "Connexion"
    })
}

exports.homePage = function (req, res, next) {
    User.
        find().
        where('username').equals(req.session.user[0]['username']).
        select().
        limit(1).
        exec(function (err, user) {
            res.render('home', {
                currentUser: user,
                title: "Page d'accueuil"
            })
        })
}

exports.signupPage = function (req, res, next) {
    console.log(req.session.user);
    res.render('signup', {
        title: "Inscription"
    })
}

exports.historyPage = function (req, res, next) {

    async.parallel({
        game: function (callback) {
            Game.
                find().
                where('user').equals(req.session.user).
                select().
                sort({
                    time: -1
                }).
                exec(callback)
        },
        player: function (callback) {
            User.
                findById(req.params.id).
                select().
                exec(callback)

        },
        //Number of game played for each language
        type: function (callback) {
            Game.aggregate([
                {
                    '$match': {
                        'user': mongoose.Types.ObjectId(req.params.id)
                    }
                }, 

                {
                    '$group': {
                        '_id': {
                            'type': '$type',
                        },
                        'total': {
                            '$sum': 1
                        }

                    }
                }
            ]).exec(callback)

        },
        //Number of game played for each language
        count: function (callback) {
            Game.aggregate([
                {
                    '$match': {
                        'user': mongoose.Types.ObjectId(req.params.id)
                    }
                }, {
                    '$group': {
                        '_id': {
                            'language': '$language',
                        },
                        'total': {
                            '$sum': 1
                        },
                    }
                }
            ]).exec(callback)

        },
        //Count the number of games played for each difficulty
        diff: function (callback) {
            Game.aggregate([
                {
                    '$match': {
                        'user': mongoose.Types.ObjectId(req.params.id)
                    }
                }, {
                    '$group': {
                        '_id': {
                            'difficulty': '$difficulty',
                        },
                        'total': {
                            '$sum': 1
                        }
                    }
                }
            ]).exec(callback)

        }
    }, function (err, results) {
        if (err) return next(err);

        //Gather the cpm of the last 6 games in arrays for easier manipulation
        let count = (results.game.length <= 6) ? results.game.length : 6;
        let date = []
        let cpm = []

        if (results.game != 0) {
            for (let i = 0; i < count; i++) {
                cpm.push(results.game[i].cpm)
                date.push(results.game[i].time)
            }
        }

        //Find the langauge with the most game played
        let idx = 0
        let total = 0
        let tempLanguage = {
            value: 0,
            language: null
        }

        results.count.forEach(lang => {
            if (idx == 0) {
                tempLanguage.value = parseInt(lang.total)
                tempLanguage.language = lang._id.language
            }
            else if (parseInt(lang.total) > tempLanguage.value) {
                tempLanguage.value = parseInt(lang.total)
                tempLanguage.language = lang._id.language
            }

            idx++;
            console.log(parseInt(lang.total));
            total += parseInt(lang.total)
        })


        idx = 0
        let tempDifficulty = {
            value: 0,
            difficulty: null
        }
        results.diff.forEach(lang => {
            if (idx == 0) {
                tempDifficulty.value = parseInt(lang.total)
                tempDifficulty.difficulty = lang._id.difficulty
            }
            else if (parseInt(lang.total) > tempDifficulty.value) {
                tempDifficulty.value = parseInt(lang.total)
                tempDifficulty.difficulty = lang._id.difficulty
            }   

            idx++;
        })

        console.log(results.type);

        res.render("history", {
            currentUser: [results.player],
            title: "Historique de parties",
            game: results.game,
            player: results.player,
            cpm: cpm,
            date: date,
            count: results.count,
            favorite: tempLanguage.language,
            total: total,
            difficulty: tempDifficulty.difficulty,
            type:results.type
        });
    })
}


exports.loginVerif = function (req, res, next) {
    User.
        find().
        where('username').equals(req.body.username).
        select().
        limit(1).
        exec(function (err, user) {

            if (user.length == 1) {
                bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                    if (result) {
                        req.session.user = user
                        res.redirect('/home'); // Login info valid
                    } else {
                        res.render('login', {
                            title: "Connexion",
                            error: ERROR[002],
                            username: user[0].username
                        }); // password invalid
                    }
                })
            } else {
                res.render('login', {
                    title: "Connexion",
                    error: ERROR[003]
                }); // Login info invalid
            }

        })

}



exports.addUser = function (req, res, next) {

    if (req.body.username != [] && req.body.password != []) {
        bcrypt.genSalt(saltRounds, function (err, salt) {
            bcrypt.hash(req.body.password, salt, function (err, hash) {
                let user = new User({
                    username: req.body.username,
                    password: hash,
                    isAdmin: false
                })
                user.save(function (err) {
                    if (err) {
                        res.render('signup', {
                            error: ERROR[004],
                            title: "Inscription"
                        })
                    } else {
                        User.
                            find().
                            where('username').equals(req.body.username).
                            select().
                            limit(1).
                            exec(function (err, user) {

                                if (user.length == 1) {
                                    req.session.user = user;
                                    res.render('home', {
                                        currentUser: req.session.user,
                                        title: "Page d'accueuil"
                                    });
                                }
                            })
                    }
                });
            })
        })

    } else {
        res.render('signup', {
            error: ERROR[005],
            title: "Inscription"
        })
    }


}