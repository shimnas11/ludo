var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var Game = require('./gameMaster');
var game = new Game(2);

var loadUser = function(req,res,next){
	if(req.cookies.name)
		req.user = {name:req.cookies.name};
	next();
};

var ensureLogin = function(req,res,next){
	// console.log('user:',req.user);
	if(req.user) next();
	else res.redirect('/index.html');
};

var app = express();

app.use('^/$',function(req, res, next){
  req.url = '/index.html';
  next();
});

app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(loadUser);

// all gets............
app.get('/ready',function(req, res){
  var resString  = JSON.stringify({'ready': game.isReady()});
  res.send(resString);
});

app.get('/update',ensureLogin,function(req, res){
	console.log(game.diceValue);
  var resData = {
		player : game.findCurrentPlayer(),
		dice : game.diceValue
	};
	res.end(JSON.stringify(resData));
});

// all posts...........
app.post('/register',function(req, res){
  var done = false;
  if(!game.isReady()){
    game.addPlayer(req.body.name);
    done = true;
  }
  res.writeHead(200, {'Set-Cookie': 'name=' + req.body.name});
  res.end(JSON.stringify({'done': done}));
});

app.post('/rollDice',function(req, res){
  var diceData =JSON.stringify({'diceValue': game.rollDice()});
  res.end(diceData);
})

app.game = game;
module.exports = app;
