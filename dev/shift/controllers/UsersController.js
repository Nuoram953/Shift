var User = require('../models/user');
var bcrypt = require('bcrypt');



exports.loginPage = function (req, res, next) {
    res.render('login',{title:"Connexion",error:"",})
}

exports.homePage = function (req, res, next) {
    res.render('home',{username:req.session.username})
}



/**
 * We're checking for user input password and the one hashed one in the DB. If valid -> home, else -> login with error message.
 */
exports.loginVerif = function (req, res, next) {
    User.
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
      
}

exports.addUser = function (req, res, next) {
    res.send('NOT IMPLEMENTED: addUser: ' + req.params.id);
}


