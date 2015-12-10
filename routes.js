var fs = require('fs');
var ld = require('lodash');
var querystring = require('querystring');
var moves = require('./library/moves.js').players;
var lib = require('./library/coins.js');
var coinsData=require('./library/coins.js').players;
var game = require('./library/gameMaster.js').game;
var diceValue;

//normal response handling functions.............
var method_not_allowed = function(req, res){
	res.statusCode = 405;
	console.log(res.statusCode);
	res.end('Method is not allowed');
};

var fileNotFound = function(req, res){
	res.statusCode = 404;
	res.end('Not Found');
};

var serveStaticFile = function(req, res, next){
	var filePath = './public' + req.url;
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

var serveIndex = function(req, res, next){
	req.url = '/index.html';
	next();
};

//game response handling functions...............
var addPlayer = function(req, res){
	var data = '';
	req.on('data', function(chunk){
		data += chunk;
	});
	req.on('end',function(){
		var entry = querystring.parse(data);
		game.addPlayer(entry.name);
		res.writeHead(200, {'Set-Cookie': 'name='+entry.name});
		res.end(JSON.stringify({username:entry.name}));
	});
};

var servePlayers = function(req, res){
	res.end(JSON.stringify(game.players));
};

//...............................................
var update={};

var moveCoin=function(req, res, next){
	var data='';
	req.on('data',function(chunk){
			data+=chunk;
    });
	req.on('end',function(){
		res.writeHead(200);
    	data=querystring.parse(data);
    	var notPermitted = lib.move(data,moves,diceValue);
    	diceValue=(notPermitted)?0:diceValue;
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
	var data = '';
	req.on('data',function(chunk){
		data +=chunk;
	});
	req.on('end',function(){
		res.writeHead(200);
		data=querystring.parse(data);
    	console.log('data parse dice :',data);
		diceValue=lib.rollDice(data);
		res.end(JSON.stringify(coinsData));
	})
}
exports.post_handlers = [
	{path: '^/register$', handler: addPlayer},
	{path: '^/refresh$', handler: giveUpdation},
	{path: '^/movement$', handler: moveCoin},
	{path:'^/rollDice',handler:diceRoll},
	{path: '', handler: method_not_allowed}
];
exports.get_handlers = [
	{path: '^/$', handler: serveIndex},
	{path:'^/players$', handler: servePlayers},
	{path: '', handler: serveStaticFile},
	{path: '', handler: fileNotFound}
];