var fs = require('fs');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ld = require('lodash');
var express = require('express');

var masterPage = fs.readFileSync('./public/master.html', "utf8");

var Game = require('./game');
var Croupier = require('./GamePool');
var PlayerPool = require('./PlayerPool');

var croupier = new Croupier(Game);
var playerPool = new PlayerPool();

var app = express();

app.use(function(req, res, next) {
	console.log(req.method, req.url);
	next();
});

app.use(express.static('public'));

app.use(bodyParser.urlencoded({
	extended: true
}));

app.use(cookieParser());

app.use(function(req, res, next) {
	if (req.cookie) req.user = req.cookies.userId;
	next();
});

var checkLoggedIn = function(req, res, next) {
	if (!req.user) res.redirect('/');
	next();
};

app.get('/', function(req, res, next) {
	var loginPage = fs.readFileSync('./public/login.html', "utf8");
	var data = masterPage.replace(/CONTENT_PLACE_HOLDER/, loginPage);
	res.send(data);
	next();
});

app.use(function(req, res, next) {
	if (req.cookies.name)
		req.user = req.cookies.name;
	next();
});


var getGameFields = function(game) {
	return {
		id: game._id,
		no_of_players: game._size,
		joined: game._size - game._players.length
	}
};

app.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.pass;
	var resBody;
	if (!playerPool.authenticate(username, password))
		resBody = {
			error: 'Wrong Credentials'
		};
	else {
		res.cookie('userId', playerPool.getIdOf(username));
		resBody = {
			success: true,
			message: 'Login Successful'
		};
	}
	console.log('INFO:: ' + username + '\'s login attempt result is ' + JSON.stringify(resBody));
	res.end(JSON.stringify(resBody));
});

app.post('/register', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;
	var resBody;
	if (!playerPool.isUserNameAvailable(username))
		resBody = {
			error: 'User already exists'
		}
	else {
		var userId = playerPool.addPlayer(username, password);
		res.cookie('userId', userId);
		resBody = {
			success: true,
			message: 'Registration successful'
		};
	}
	console.log('INFO:: ' + username + '\'s Register attempt result is ' + JSON.stringify(resBody));

	res.end(JSON.stringify(resBody));
});

app.get('/board', function(req, res) {
	var board = fs.readFileSync('./public/board.html', "utf8");
	var data = masterPage.replace(/CONTENT_PLACE_HOLDER/, board);
	res.send(data);
});

app.get('/chooseGame', function(req, res) {
	var chooseGamePage = fs.readFileSync('./public/chooseGame.html', "utf8");
	var data = masterPage.replace(/CONTENT_PLACE_HOLDER/, chooseGamePage);
	res.send(data);
});

app.post('/endGame', function(req, res) {
	var gameId = req.cookies.gameId;
	croupier.endGame(gameId);
	res.send(JSON.stringify({
		status: true
	}));
});

app.get('/getGames', function(req, res) {
	var games = croupier.getAvailableGames(getGameFields);
	res.set('Content-Type', 'application/json')
	res.end(JSON.stringify(games));
});

app.post('/addGame', function(req, res) {
	var gameId = croupier.addGame(req.body.gameSize, req.user);
	res.cookie('gameId', gameId);
	res.end(JSON.stringify({
		success: true
	}));
});

app.post('/joinGame', function(req, res) {
	var game = croupier.getGameById(req.body.gameId);
	var status;
	if (game) {
		game.addPlayer(req.user);
		res.cookie('gameId', req.body.gameId);
		res.end(JSON.stringify({
			success: true
		}))
	}
	res.end(JSON.stringify({
		success: false
	}));
});

app.get('/isGameReady', function(req, res) {
	var game = croupier.getGameById(req.cookies.gameId);
	if (game) {
		res.end(JSON.stringify({
			ready: game.isReady(),
			players: game.getNamesOfPlayers()
		}));
	}
	res.end();
});

var filterPlayer = function(players) {
	var filteredPlayers = [];
	for (player of players) {
		filteredPlayers.push({
			name: player._name,
			colour: player._colour
		})
	}
	return filteredPlayers;
};

app.post('/getPlayerCoins', function(req, res) {
	var players = filterPlayer(game._players);
	res.end(JSON.stringify({
		players: players
	}));
});

app.post('/move', function(req, res) {
	var game = croupier.getGameById(req.cookies.gameId);
	var currentPlayer = game.currentPlayer;
	if (game && req.body.colour == currentPlayer._colour) {
		if (req.body.playerName == currentPlayer._name) {
			var coin = req.body;
			game.moveCoin(coin);
		}
	}
	res.end();
});

var findHomeCoins = function(coins) {
	var count = ld.countBy(coins, function(coin) {
		return coin._position == null;
	});
	return count.true;
};

app.get('/getStatus', function(req, res) {
	var game = croupier.getGameById(req.cookies.gameId);
	if (!game) res.end();
	var coins = game.getAllCoins();
	var homeCoinCount = findHomeCoins(game.currentPlayer._coins);
	var status = {
		diceValue: game._diceValue,
		player: game.currentPlayer._name,
		coins: coins,
		winner: game._winner,
		kills: game.currentPlayer._kills,
		destinationCoins: game.currentPlayer._destinationCoins,
		homeCoinCount: homeCoinCount,
		colour: game.currentPlayer._collour
	};
	res.json(status);
});

app.post('/dice', function(req, res) {
	var game = croupier.getGameById(req.cookies.gameId);
	if (req.cookies.name == game.currentPlayer._name) {
		var diceValue = game.getDiceValue();
		res.end(JSON.stringify({
			diceValue: diceValue
		}));
	}
	res.end();
});

app.controller = function(games) {
	app.games = games || [];
};

module.exports = app;
