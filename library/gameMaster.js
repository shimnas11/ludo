var Player = require('./player');
var ld = require('lodash');
var diceLib = require('./dice.js');

var colours = ['green','yellow','blue','red'];

// var game = {};
// game.players = [];
// game.dice = 1;
// game.board;
//
// game.addPlayer = function(name){
// 	game.players.push(new Player(name,colours.shift()));
// };

var Game = function(totalNumberOfPlayers){
	this.board = [];
	this._dice = new diceLib.Dice();
	this.players = [];
	this.totalNumberOfPlayers = totalNumberOfPlayers;
}

Game.prototype = {
	get diceValue(){
		return this._dice.diceValue;
	},
	addPlayer : function(name){
		var numberOfPlayers = this.players.length;
		if(numberOfPlayers < this.totalNumberOfPlayers){
			var player = new Player(name,colours.shift());
			player.isMyTurn = numberOfPlayers==0;
			this.players.push(player);
			return true;
		};
		return false;
	},
	findCurrentPlayer:function(){
		var currentPlayerIndex = ld.findIndex(this.players, { 'isMyTurn': true });
		return this.players[currentPlayerIndex];
	},
	findNextPlayer:function(){
		var currentPlayerIndex = ld.findIndex(this.players, { 'isMyTurn': true });

		var nextPlayerIndex = (currentPlayerIndex==(this.totalNumberOfPlayers -1)) ? 0 : currentPlayerIndex +1;
		return this.players[nextPlayerIndex];
	},
	rollDice:function(){
		this._dice.roll();
		var currentPlayer = this.findCurrentPlayer();
		if(this._dice.diceValue == 6)
			currentPlayer.chance++;
		if(!currentPlayer.chance)
			this.changeTurn();
	},
	changeTurn : function(){
		var player = this.findCurrentPlayer();
		this.findNextPlayer().isMyTurn = true;
		player.isMyTurn = false;
	}
};

module.exports = Game;
