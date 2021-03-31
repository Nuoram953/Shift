var express = require('express');
var router = express.Router();


var userController = require('../controllers/UsersController')
var gameController = require('../controllers/GameController')




router.get('/', function(req, res, next) {
    res.render('index',{ title: 'Shift' });
  });

router.get('/login',userController.loginPage)

router.post('/login/verif', userController.loginVerif)

router.get('/home', userController.homePage)

router.get('/signup', userController.signupPage)

router.post('/signup/newUser', userController.addUser)

router.get('/game/prep', gameController.preGame_trad)

router.post('/gameStart', gameController.startGame)

router.get('/game',gameController.gamePage)





module.exports = router;