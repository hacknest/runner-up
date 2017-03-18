var api_functions = require('./api.js');
var bodyParser = require('body-parser');
var jsonBodyParser = bodyParser.json();
var express = require('express');
var router =  express.Router();

router.post('/reviews', jsonBodyParser, function(req, res){
    res.json(req.body);
});

module.exports = router;
