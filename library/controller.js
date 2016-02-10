var Game = require('./game');
var fs = require('fs');
var Croupier = require('./croupier');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var ld = require('lodash');

var croupier = new Croupier(Game);

var express = require('express');
var app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());

app.get('/', function(req, res, next) {
  var masterPage = fs.readFileSync('./public/master.html', "utf8");
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

// terminal logging .......
// app.use(function(req, res, next) {
//   console.log('URL:', req.url);
//   next();
// })

var getGameFields = function(game) {
  return {
    id: game._id,
    no_of_players: game._size,
    joined: game._size - game._players.length
  }
};

app.post('/login', function(req, res) {
  res.cookie('name', req.body.name);
  var masterPage = fs.readFileSync('./public/master.html', "utf8");
  var chooseGamePage = fs.readFileSync('./public/chooseGame.html', "utf8");
  var data = masterPage.replace(/CONTENT_PLACE_HOLDER/, chooseGamePage);
  res.send(data);
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

app.post('/getPlayerCoins',function(req,res){
    console.log(game._players);
    res.end(JSON.stringify(game._players));
})


app.post('/move', function(req, res) {
  var game = croupier.getGameById(req.cookies.gameId);
  var currentPlayer = game.currentPlayer;
  if (game && req.body.colour == currentPlayer._colour) {
    if(req.body.playerName == currentPlayer._name){
      var coin = req.body;
      game.moveCoin(coin);
    }
  }
  res.end();
});

app.get('/getStatus', function(req, res) {
  var game = croupier.getGameById(req.cookies.gameId);
  if (!game) res.end();
  var coins = game.getAllCoins();
  var status = {
    diceValue: game._diceValue,
    player: game.currentPlayer,
    coins: coins,
  }
  res.end(JSON.stringify(status));
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
