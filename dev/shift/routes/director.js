/*******************************************************************
*NAME: ANTOINE AUGER-MAROUN
*DATE: 12/04/2021
*OBJECT: Redirects every links to their controller and function
*FICHIER: director.js
/*******************************************************************/

var express = require('express');
var router = express.Router();


var userController = require('../controllers/UsersController')
var gameController = require('../controllers/GameController')
var languageController = require('../controllers/LanguageController')
var adminController = require('../controllers/AdminController')



/****************************************************************
 * User Controller
 ****************************************************************/
router.get('/', userController.indexPage)

router.get('/login', userController.loginPage)

router.post('/login/verif', userController.loginVerif)

router.get('/home', userController.homePage)

router.get('/signup', userController.signupPage)

router.get('/history/user/:id', userController.historyPage)

router.post('/signup/newUser', userController.addUser)


/****************************************************************
 * Game Controller
 ****************************************************************/
router.get('/game/details/:id', gameController.detailsGame)

router.get('/game/prep', gameController.preGame_trad)

router.post('/gameStart', gameController.startGame)

router.get('/game', gameController.gamePage)

router.post('/game/Noun', gameController.gameGetNoun)

router.post('/game/Expression', gameController.gameGetExpression)

router.post('/game/result', gameController.addGame)

router.get('/game/end', gameController.homePage)

router.get('/result', gameController.resultPage)

router.get('/adventure', gameController.adventurePage)


/****************************************************************
 * Language Controller
 ****************************************************************/
router.get('/adventure/expression', languageController.findWord)


/****************************************************************
 * Admin Controller
 ****************************************************************/
router.get('/admin', adminController.adminPage)



module.exports = router;