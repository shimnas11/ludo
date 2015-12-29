var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var querystring = require('querystring');
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
app.get('/',function(req, res, next){
  req.url = '/index.html';
  next();
});

app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.raw());
app.use(loadUser);

// all gets............
app.get('/ready',function(req, res){
  var resString  = JSON.stringify({'ready': game.isReady()});
  res.send(resString);
});


// all posts...........
app.get('/update',function(req, res){
  var resData = {
		player : game.findCurrentPlayer(),
		dice : game.diceValue
	};
	res.end(JSON.stringify(resData));
});

app.post('/register',function(req, res){
  var success = false;
	 var name = req.body.name;
  if(!game.isReady()){
    game.addPlayer(name);
    success = true;
  }
	res.cookie('name',name);
  res.end(JSON.stringify({'success': success}));
});

app.get('/rollDice',function(req, res){
  var diceData =JSON.stringify({'diceValue': game.rollDice()});
	console.log('in contr',diceData);
  res.end(diceData);
});

app.game = game;
module.exports = app;
