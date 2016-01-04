var Player = require('./player');
var ld = require('lodash');
var Dice = require('./dice.js');
var Board = require('./board.js');
var Coin = require('./coins.js');

var Game = function(totalNumberOfPlayers){
	this.board = new Board();
	this._dice = new Dice();
	this.players = [];
	this.totalNumberOfPlayers = totalNumberOfPlayers;
	this.colours = ['green','yellow','blue','red'];
}

Game.prototype = {
	get diceValue(){
		return this._dice.value;
	},
	addPlayer: function(name){
		var numberOfPlayers = this.players.length;
		if(numberOfPlayers < this.totalNumberOfPlayers && name){
			var coins = this.generateCoins(this.colours.shift(),4);
			var player = new Player(name,coins);
			 if(numberOfPlayers==0){
			 	player.isMyTurn = true;
				player.addOneBonus();
			}
			this.players.push(player);
			return true;
		};
		return false;
	},
	getPlayer: function(name){
		var playerIndex = ld.findIndex(this.players, { 'name': name });
		return this.players[playerIndex];
	},
	findCurrentPlayer: function(){
		var currentPlayerIndex = ld.findIndex(this.players, { 'isMyTurn': true });
		return this.players[currentPlayerIndex];
	},
	findNextPlayer: function(){
		var currentPlayerIndex = ld.findIndex(this.players, { 'isMyTurn': true });

		var nextPlayerIndex = (currentPlayerIndex==(this.totalNumberOfPlayers -1)) ? 0 : currentPlayerIndex +1;
		return this.players[nextPlayerIndex];
	},
	findPlayerWithCoinColour: function(coinColour){
		var player = this.players.filter(function(player){
			return ld.findIndex(player.coins,{'color':coinColour})+1;
		})
		return player[0];
	},
	rollDice: function(){
		var currentPlayer = this.findCurrentPlayer();
		if(currentPlayer.chance){
			this._dice.roll();
			if(this.diceValue != 6){
				console.log('before',currentPlayer.chance)
				currentPlayer.removeOneBonus();
				console.log('after',currentPlayer.chance)
			}
		}
		if(!currentPlayer.chance) this.changeTurn();
		return this.diceValue
	},
	changeTurn: function(){
		var player = this.findCurrentPlayer();
		var newPlayer = this.findNextPlayer()
		newPlayer.isMyTurn = true;
		newPlayer.addOneBonus();
		player.isMyTurn = false;
	},
	generateCoins: function(color,count){
		var coins = [];
		var start = (this.players.length * count) + 1;
		var end = start + count;
		for (var i = start; i < end; i++)
			coins.push(new Coin(color,i));
		return coins;
	},
	isReady: function(){
		if(this.players.length == this.totalNumberOfPlayers)
			return true;
		return false;
	},
	moveCoin: function(id,color){
		var coin = this.findPlayerWithCoinColour(color).getCoin(id);
		var position = board.findNextPosition(coin,this.diceValue);
	}
};

module.exports = Game;
