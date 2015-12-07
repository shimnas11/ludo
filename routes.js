var fs = require('fs');
var ld = require('lodash');
var querystring = require('querystring');
var moves = require('./library/moves.js').players;
var lib = require('./library/coins.js');
var coinsData=require('./library/coins.js').players;
var diceValue;

var method_not_allowed = function(req, res){
	res.statusCode = 405;
	console.log(res.statusCode);
	res.end('Method is not allowed');
};

var fileNotFound = function(req, res){
	res.statusCode = 404;
	res.end('Not Found');
};

var joinPlayer = function(req, res){
	var data='';
	req.on('data',function(chunk){
    		data+=new Buffer(chunk, 'base64').toString('ascii');
    	});
	req.on('end',function(){
		res.writeHead(301,{
    		'Location':'public/board.html',
    		'Content-Type':'text/html',
    	});
		res.end();
	});
};

var serveIndex = function(req, res, next){
	req.url = '/public/index.html';
	next();
};

var serveStaticFile = function(req, res, next){
	var filePath = '.' + req.url;
	fs.readFile(filePath, function(err, data){
		if(data){
			res.statusCode = 200;
			res.end(data);
		}
		else{
			next();
		}
	});
};

var update={};

var moveCoin=function(req, res, next){
	var data='';
	req.on('data',function(chunk){
			data+=chunk;
    });
	req.on('end',function(){
		res.writeHead(200);
    	data=querystring.parse(data);
    	lib.move(data,moves,diceValue);
    	res.end(JSON.stringify(coinsData));
	});
    
};

var giveUpdation=function(req, res, next){
	var data='';
	req.on('data',function(chunk){
			data+=chunk;
    	});
	req.on('end',function(){
		res.writeHead(200);
    	res.end(JSON.stringify(coinsData));
	});
};
var diceRoll = function(req,res,next){
	console.log('==========================================');
	var data = '';
	req.on('data',function(chunk){
		data +=chunk;
	});
	req.on('end',function(){
		res.writeHead(200);
		diceValue = lib.rollDice(data);
		res.end(JSON.stringify(diceValue));
	})
}
exports.post_handlers = [
	{path: '^/$', handler: joinPlayer},
	{path: '^/public/refresh$', handler: giveUpdation},
	{path: '^/public/movement$', handler: moveCoin},
	{path: '^/public/rollDice$', handler: diceRoll},
	{path: '', handler: method_not_allowed}
];
exports.get_handlers = [
	{path: '^/$', handler: serveIndex},
	{path:'^/public/rollDice',handler:diceRoll},
	{path: '', handler: serveStaticFile},
	{path: '', handler: fileNotFound}
];

