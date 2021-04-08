var User = require('../models/user');
var bcrypt = require('bcrypt');

const saltRounds = 10;

let currentUser = null;

let error = {
  001:"",
  002:"Mauvais mot de passe",
  003:"Mauvais nom d'utilisateur et mot de passe",
  004:"Nom d'utilisateur est déjà existant",
  005:"Les informations ne sont pas valides"
};



exports.loginPage = function (req, res, next) {
    res.render('login', { title: "Connexion" })
}

exports.homePage = function (req, res, next) {
    res.render('home', { currentUser:req.session.user,title:"Page d'accueuil" })
}

exports.signupPage = function (req, res, next) {
    console.log(req.session.user);
    res.render('signup',{title:"Inscription"})
}





/**
 * We're checking for user input password and the one hashed one in the DB. If valid -> home, else -> login with error message.
 */
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
                        res.render('login', { title: "Connexion", error: error[002], username: user[0].username }); // password invalid
                    }
                })
            } else {
                res.render('login', { title: "Connexion", error: error[003] }); // Login info invalid
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
                        res.render('signup', { error: error[004]  })
                    }
                    else {
                        User.
                            find().
                            where('username').equals(req.body.username).
                            select().
                            limit(1).
                            exec(function (err, user) {

                                if (user.length == 1) {
                                    req.session.user = user;
                                    res.render('home', {currentUser:req.session.user} );
                                }
                            })
                    }
                });
            })
        })

    } else {
        res.render('signup', { error: error[005] })
    }


}


