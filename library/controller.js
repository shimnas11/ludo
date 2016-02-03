var Game = require('./game');
var fs = require('fs');
var Croupier = require('./croupier');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

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
  var loginPage = fs.readFileSync('./public/login.html',"utf8");
  var data = masterPage.replace(/CONTENT_PLACE_HOLDER/,loginPage);
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
    no_of_players: game._totalPlayers,
    joined: game._totalPlayers - game._players.length
  };
};

app.post('/login',function(req,res){
	req.header.cookie = req.body.name;
  var masterPage = fs.readFileSync('./public/master.html', "utf8");
  var chooseGamePage = fs.readFileSync('./public/chooseGame.html', "utf8");
  var data = masterPage.replace(/CONTENT_PLACE_HOLDER/,chooseGamePage);
	res.send(data);
});

app.get('/getGames', function(req, res) {
  var games = croupier.getAllGames(getGameFields);
  res.set('Content-Type', 'application/json')
  res.end(JSON.stringify(games));
});

app.post('/addGame', function(req, res) {
  croupier.addGame(req.body.gameSize, req.user);
  res.end(JSON.stringify({
    success: true
  }));
});

app.post('/joinGame', function(req, res) {
  var game = croupier.getGameById(req.body.gameId);
  game.addPlayer(req.user);
  res.end(JSON.stringify({
    success: true
  }));
});

app.controller = function(games){
  app.games = games || [];
};

module.exports = app;
