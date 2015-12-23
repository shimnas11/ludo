var Player = require('./player');
var ld = require('lodash');
var Dice = require('./dice.js');
var Coin = require('./coins.js').Coin;

var Game = function(totalNumberOfPlayers){
	this.board = [];
	this._dice = new Dice();
	this.players = [];
	this.totalNumberOfPlayers = totalNumberOfPlayers;
	this.colours = ['green','yellow','blue','red'];
}

Game.prototype = {
	get diceValue(){
		return this._dice.value;
	},
	addPlayer : function(name){
		var numberOfPlayers = this.players.length;
		if(numberOfPlayers < this.totalNumberOfPlayers){
			var coins = this.generateCoins(this.colours.shift(),4);

			var player = new Player(name,coins);
			player.isMyTurn = numberOfPlayers==0;

			this.players.push(player);
			return true;
		};
		return false;
	},
	getPlayer:function(name){
		var playerIndex = ld.findIndex(this.players, { 'name': name });
		return this.players[playerIndex];
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
		currentPlayer.chance--;
		if(this._dice.diceValue == 6)
			currentPlayer.chance++;
		if(!currentPlayer.chance)
			this.changeTurn();
		return this._dice.value;
	},
	changeTurn : function(){
		var player = this.findCurrentPlayer();
		this.findNextPlayer().isMyTurn = true;
		player.isMyTurn = false;
	},
	generateCoins:function(color,count){
		var coins = [];
		for (var i = 0; i < count; i++)
			coins.push(new Coin(color,i));
		return coins;
	},
	isReady: function(){
		if(this.players.length == this.totalNumberOfPlayers)
			return true;
		return false;
	}
};

module.exports = Game;
