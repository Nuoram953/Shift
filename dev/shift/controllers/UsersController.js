var User = require('../models/user');
var bcrypt = require('bcrypt');
<<<<<<< Updated upstream
=======
const { select } = require('async');
const { body, validationResult } = require('express-validator');
>>>>>>> Stashed changes



exports.loginPage = function (req, res, next) {
    res.render('login', { title: "Connexion", error: "", })
}

exports.homePage = function (req, res, next) {
<<<<<<< Updated upstream
    res.render('home',{username:req.session.username})
=======
    res.render('home', { currentUser })
}

exports.signupPage = function (req, res, next) {
    res.render('signup')
>>>>>>> Stashed changes
}



/**
 * We're checking for user input password and the one hashed one in the DB. If valid -> home, else -> login with error message.
 */
exports.loginVerif = function (req, res, next) {
    User.
<<<<<<< Updated upstream
    find().
    where('username').equals(req.body.username).
    select('password username').
    limit(1).
    exec(function (err, user) {
   
        if (user.length == 1){
            bcrypt.compare(req.body.password,user[0].password,function (err,result) {
                if (result){
                    req.session.username = req.body.username;
                    res.redirect('/director/home'); // Login info valid
                }else{                   
                    res.render('login',{title:"Connexion",error:"Mauvais mot de passe",username:user[0].username}); // password invalid
                }  
            })
        }else{
            res.render('login',{title:"Connexion",error:"Mauvais nom d'utilisateur et mot de passe"}); // Login info invalid
        }
        
    })
      
=======
        find().
        where('username').equals(req.body.username).
        select().
        limit(1).
        exec(function (err, user) {

            if (user.length == 1) {
                bcrypt.compare(req.body.password, user[0].password, function (err, result) {
                    if (result) {
                        currentUser = user
                        res.redirect('/home'); // Login info valid
                    } else {
                        res.render('login', { title: "Connexion", error: "Mauvais mot de passe", username: user[0].username }); // password invalid
                    }
                })
            } else {
                res.render('login', { title: "Connexion", error: "Mauvais nom d'utilisateur et mot de passe" }); // Login info invalid
            }

        })

>>>>>>> Stashed changes
}

exports.addUser = function (req, res, next) {
<<<<<<< Updated upstream
    res.send('NOT IMPLEMENTED: addUser: ' + req.params.id);
=======

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
                        res.render('signup', { error: "Nom d'utilisateur est déjà existant" })
                    }
                    else {
                        User.
                            find().
                            where('username').equals(req.body.username).
                            select().
                            limit(1).
                            exec(function (err, user) {

                                if (user.length == 1) {
                                    currentUser = user;
                                    res.render('home', { currentUser });
                                }
                            })
                    }
                });
            })
        })

    } else {
        res.render('signup', { error: "Les informations ne sont pas valides" })
    }


>>>>>>> Stashed changes
}


