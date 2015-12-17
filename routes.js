var fs = require('fs');
var ld = require('lodash');
var querystring = require('querystring');
var moves = require('./library/moves.js').players;
var lib = require('./library/coins.js');
var coinsData=require('./library/coins.js').players;
var gameLib = require('./library/gameMaster');
var game = new gameLib(2);
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
		var name = querystring.parse(data).name;
		var overflow = game.addPlayer(name) ? false : true ;
		res.writeHead(200, {'Set-Cookie': 'name=' + name});
		res.end(JSON.stringify({username:name,overflow:overflow}));
	});
};

var servePlayers = function(req, res){
	res.end(JSON.stringify(game.players));
};

var giveUpdates = function(req, res){
	var resData = {
		player : game.findCurrentPlayer(),
		dice : game.diceValue
	};
	res.end(JSON.stringify(resData))
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
  	data = querystring.parse(data);
		console.log('data',data);
  	var notPermitted = lib.move(data,moves,game.diceValue);
		game.players[0].chance--;
		// if(game.players[0].chance ==0 ){
		// 	game.changeTurn();
		// };
  	// game.dice = (notPermitted) ? 0 : game.dice;
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
		game.rollDice();
		res.end(JSON.stringify(game.diceValue));
	});
};

exports.post_handlers = [
	{path: '^/register$', handler: addPlayer},
	{path: '^/refresh$', handler: giveUpdation},
	{path: '^/movement$', handler: moveCoin},
	{path: '^/rollDice$', handler: diceRoll},
	{path: '', handler: method_not_allowed}
];
exports.get_handlers = [
	{path: '^/$', handler: serveIndex},
	{path:'^/players$', handler: servePlayers},
	{path:'^/rollDice',handler:diceRoll},
	{path:'^/update',handler:giveUpdates},
	{path: '', handler: serveStaticFile},
	{path: '', handler: fileNotFound}
];
