var Language = require('../models/language');





exports.findWord = function(req,res,next){
    Language.count().exec(function(err,count){
        Language.findOne().skip(Math.random()*count).exec(function(err,word){
            console.log(word);
            res.send(word)
        })
    })
}

//OPTIONEL - Fonction d'admin
exports.addLanguages = function(req,res,next){
    res.send('NOT IMPLEMENTED: addLanguage: ' + req.params.id);
}

exports.listWords = function(req,res,next){
    res.send('NOT IMPLEMENTED: listWords: ' + req.params.id);
}

exports.detailsWord = function(req,res,next){
    res.send('NOT IMPLEMENTED: detailsWord: ' + req.params.id);
}




