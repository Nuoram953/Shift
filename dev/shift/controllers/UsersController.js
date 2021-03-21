var User = require('../models/user');
var bcrypt = require('bcrypt');
const { select } = require('async');
const { body,validationResult } = require('express-validator');

const saltRounds = 10;

let currentUser = null;


exports.loginPage = function (req, res, next) {
    res.render('login',{title:"Connexion",error:"",})
}

exports.homePage = function (req, res, next) {
    res.render('home',{currentUser})
}

exports.signupPage = function (req, res, next){
    res.render('signup')
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
   
        if (user.length == 1){
            bcrypt.compare(req.body.password,user[0].password,function (err,result) {
                if (result){
                    currentUser = user
                    res.redirect('/home'); // Login info valid
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




                
    bcrypt.genSalt(saltRounds, function (err, salt){
        bcrypt.hash(req.body.password, salt, function (err, hash) {
            let user = new User({
                username:req.body.username,
                password:hash,
                isAdmin:false
            })
            user.save(function (err){
                if (err) {
                    res.render('signup',{error:"Nom d'utilisateur est déjà existant"})
                }
                else{
                    res.render('home',{username:req.body.username,admin:false})
                }
            });
        })
    })
    
    
}


