var fs = require('fs');
var ld = require('lodash');
var querystring = require('querystring');
var moves = require('./library/moves.js').players;
var lib = require('./library/coins.js');
var coinsData=require('./library/coins.js').players;
var game = require('./library/gameMaster.js').game;

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
		var overflow = true;
		var entry = querystring.parse(data);
		if(game.players.length < 4){
			game.addPlayer(entry.name);
			overflow = false;
		}
		res.writeHead(200, {'Set-Cookie': 'name='+entry.name});
		res.end(JSON.stringify({username:entry.name,overflow:overflow}));
	});
};

var servePlayers = function(req, res){
	res.end(JSON.stringify(game.players));
};

var giveUpdates = function(req, res){
	var resData = {
		player : game.players[0], //players[0] always is current player
		dice : game.dice
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
  	var notPermitted = lib.move(data,moves,game.dice);
		game.players[0].chance--;
		// if(game.players[0].chance ==0 ){
		// 	changeTurn();
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

var changeTurn  = function() {
	game.players.push(game.players.shift());
	console.log('inside changeTurn function',game.players);
}

var diceRoll = function(req,res,next){
	var data = '';
	req.on('data',function(chunk){
		data +=chunk;
	});
	req.on('end',function(){
		res.writeHead(200);
		game.dice = lib.rollDice();
		if(game.dice == 6) {
			console.log('inside six case------------------------');
			game.players[0].chance++;
		}
		if(!game.players[0].chance){
			console.log('inside changeTurn---------------------')
			changeTurn();
		}
		console.log('turn',game.players[0]);
		res.end(JSON.stringify(game.dice));
	})
}
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
