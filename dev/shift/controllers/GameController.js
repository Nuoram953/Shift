var Game = require('../models/game')


exports.preGame_trad = function (req, res, next) {
    res.render('pregame_normal',{currentUser:req.session.user})
}



//OPTIONEL - Fonction d'admin
exports.addGame = function(req,res,next){
    res.send('NOT IMPLEMENTED: addGame: ' + req.params.id);
}

exports.listGames = function(req,res,next){
    res.send('NOT IMPLEMENTED: listGames: ' + req.params.id);
}

exports.detailsGame = function(req,res,next){
    res.send('NOT IMPLEMENTED: detailsGame: ' + req.params.id);
}
