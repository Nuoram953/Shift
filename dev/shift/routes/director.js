var express = require('express');
var router = express.Router();

var userController = require('../controllers/UsersController')

router.get('/', function(req, res, next) {
    res.render('index',{ title: 'Shift' });
  });

router.get('/login',userController.loginPage)

router.post('/login/verif', userController.loginVerif)

router.get('/home', userController.homePage)

router.get('/signup', userController.signupPage)

router.post('/signup/newUser', userController.addUser)




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