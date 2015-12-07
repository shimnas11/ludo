var Player = require('./player.js').Player;
var Board = require('./board.js').Board;
var ld = require('lodash');

var game = {};
exports.game = game;

var colours = ['green','blue','red','yellow'];
game.players = [];
game.board;

game.addPlayer = function(name){
	game.players.push(new Player(name,colours.shift()));
	if(game.players.length >= 2) game.board = new Board();
};
