var User = require('../models/user');
var bcrypt = require('bcrypt');



exports.loginIndex = function (req, res, next) {
    res.render('login',{title:"Connexion",error:"",})
}

exports.loginVerif = function (req, res, next) {

    User.
    find().
    where('username').equals(req.body.username).
    select('password').
    limit(1).
    exec(function (err, user) {
        bcrypt.compare(req.body.password,user[0].password,function (err,result) {
            if (result){
                req.session.username = req.body.username;
                res.redirect('/director/home'); // Login info valid
            }else{
                res.render('login',{title:"Connexion",error:"Mauvais nom d'utilisateur ou mot de passe",}); // Login info invalid
            }
            
        })
    })
    
    
}
exports.home = function (req, res, next) {
    res.render('home',{title:req.session.username})
}