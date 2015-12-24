var Player = require('./player');
var ld = require('lodash');
var diceLib = require('./dice.js');
var boardLib = require('./board.js');
var Coin = require('./coins.js').Coin;

var Game = function(totalNumberOfPlayers){
	this._dice = new diceLib();
	this.board = new boardLib.Board();
	this.players = [];
	this.totalNumberOfPlayers = totalNumberOfPlayers;
	this.colours = ['green','yellow','blue','red'];
}

Game.prototype = {
	get diceValue(){
		return this._dice.diceValue;
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

	findPlayerWithCoinColour:function(coinColour){
		var playerWhoseCoinIsToBeKilled = this.players.filter(function(player){
			return ld.findIndex(player._coins,{'colour':coinColour})+1;
		})
		return playerWhoseCoinIsToBeKilled[0];
	},

	move:function(coinToBeMoved,diceValue){
		var notPermitted;

		board.isOnBoard(coinToBeMoved);
		board.getPositionIfMoved(coinToBeMoved,diceValue);

		var cellRoutes = moves[coinToBeMoved.coinClass];
		if(Object.keys(players[coinToBeMoved.coinClass]) == 0 || 
			players[coinToBeMovedcoinClass][coinToBeMoved.coinId]==undefined){
			var pos = cellRoutes.indexOf(+coinToBeMoved.position);
		}
		else{
			var pos = cellRoutes.indexOf(+players[coinToBeMoved.coinClass][coinToBeMovedcoinId].position);
		}
		if(!pos && diceValue==6){
			coinToBeMovedposition = cellRoutes[pos+1];
			notPermitted=true;
		}
		else if(pos){
			coinToBeMovedposition = cellRoutes[pos+diceValue];
			var coinMovement = exports.kill(coinToBeMoved);
			notPermitted=(coinMovement);
		}
		players[coinToBeMoved.coinClass][coinToBeMoved.coinId]=coinToBeMoved;
		return notPermitted;
	}

	// kill:function(coinToBeKilled,playerIdTryingToKill){
	// 	var playerWhoseCoinIsToBeKilled = ld.findIndex(this.players, {'coinColour':coinToBeKilled.colour} );
	// 	console.log('========================='+playerWhoseCoinIsToBeKilled);

	// 	var coinMovement = true;
	// 	var killingPlayer1 = [], killingPlayer2 = [], sameCoins1 = [], sameCoins2 = [];
	// 	if(coin.coinClass == 'player1'){
	// 		killingPlayer2 = Object.keys(players.player2).filter(function(keys){
	// 			return players.player2[keys].position == coin.position;
	// 		});
	// 		sameCoins1 = Object.keys(players.player1).filter(function(keys){
	// 			return players.player1[keys].position == coin.position;
	// 		});
	// 	}
	// 	if(coin.coinClass == 'player2'){
	// 		killingPlayer1 = Object.keys(players.player1).filter(function(keys){
	// 			return players.player1[keys].position == coin.position;
	// 		});
	// 		sameCoins2 = Object.keys(players.player2).filter(function(keys){
	// 			return players.player2[keys].position == coin.position;
	// 		});
	// 	}
	// 	if(killingPlayer2.length!=0 && safePositions.indexOf(coin.position)<0)
	// 		players.player2[killingPlayer2[0]].position=01;
	// 	if(killingPlayer1.length!=0 && safePositions.indexOf(coin.position)<0 )
	// 		players.player1[killingPlayer1[0]].position=00;
	// 	if(sameCoins1.length!=0 && safePositions.indexOf(coin.position)<0){
	// 		coin.position = players.player1[coin.coinId].position;
	// 		coinMovement = false;
	// 	}
	// 	if(sameCoins2.length!=0 && safePositions.indexOf(coin.position)<0){
	// 		coin.position = players.player2[coin.coinId].position;
	// 		coinMovement = false;
	// 	}
	// 	return coinMovement;
	// }
};

module.exports = Game;