var express = require('express');
var router = express.Router();

var userController = require('../controllers/UsersController')

router.get('/login',userController.loginIndex)

router.post('/login/verif', userController.loginVerif)

router.get('/home', userController.home)






 //router.post('/login/connection', function(req, res) {
 //  let username = req.body.username;
 //  console.log(req.body.username);
 //  if(username != "Antoine"){
 //    res.render('login',{title:"Connexion",error:"Mauvais nom"});
 //  }else{
 //    res.redirect('/director/home');
 //  }
 //});

 //router.get('/home', function(req, res) {
 //  res.render('home',{title:"Connexion",error:""});
 //  
 //});

module.exports = router;