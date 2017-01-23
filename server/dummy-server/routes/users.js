var express = require('express');
var router = express.Router();

var fs = require('fs');
var file = "./data/user-list-data.json";

/* GET user list. */
router.get('/list', function(req, res, next) {
	// read json data
	var jsonString = fs.readFileSync(file);
	var jsonData = JSON.parse(jsonString);

	// build paging object
	var paging = {};
	paging.total = jsonData.length || 0;
	paging.pageSize = 10;
	paging.pageCnt = Math.floor( (paging.total-1) / paging.pageSize + 1 ); // begin with 1
	paging.pageNo = Math.floor(req.query.pageNo) || 1;
	paging.pageNo = (paging.pageNo>paging.pageCnt)? paging.pageCnt : paging.pageNo;

	// fetch pading data
	var rows = [];
	var fromIdx = paging.pageSize * (paging.pageNo-1);
	for(var idx = fromIdx, i=0; i< paging.pageSize ; ++idx , ++i){
		if(idx > paging.total-1){
			break ;
		}
		var row = jsonData[idx];
		rows.push(row);
	}

	// build return value
	var ret = {};
	ret.title = "User List";
	ret.rows = rows;
	ret.paging = paging ;

	res.send(ret);
});

router.get('/delete', function(req, res, next) {
	var jsonString = fs.readFileSync(file);
	var jsonData = JSON.parse(jsonString);

	var id = req.query.id;
	console.log("delete record id : ", id);

	// find idx to row to be deleted.
	var length = jsonData.length || 0;
	var newJsonData = [];
	for(var i=0;i<length;++i){
		var row = jsonData[i] || {};
		if(row.id == id){
			continue;
		}
		newJsonData.push(row);
	}

	// save to file 
	var jsonString = JSON.stringify(newJsonData);
	fs.writeFileSync(file,jsonString);
	res.send("ok");
});

router.post('/add', function(req, res, next) {
	

	var postdata = "";
    req.addListener("data",function(postchunk){
        postdata += postchunk;
    });

    req.addListener("end",function(){
    	var uuid = require('uuid');  
		var id = uuid.v4();
     	console.log("postdata",postdata);
     	res.send(id); 
    });
});

router.post('/update', function(req, res, next) {
	var postdata = "";
    req.addListener("data",function(postchunk){
        postdata += postchunk;
    });

    req.addListener("end",function(){
     	console.log("postdata",postdata);

    });
});


module.exports = router;
