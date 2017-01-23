var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  //res.send('respond with a resource');
  	var fs = require('fs');
	var file = "./data/user-list-data.json";
	var jsonString = fs.readFileSync(file);
	var jsonData = JSON.parse(jsonString);
	res.send(jsonData);
});

module.exports = router;
