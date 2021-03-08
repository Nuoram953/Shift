var express = require('express');
var router = express.Router();

router.get('/login', function(req, res) {
    res.render('login',{title:"Connexion",error:""});
    
  });

  router.post('/login/connection', function(req, res) {
    console.log(req.body.username);
    
  });

module.exports = router;