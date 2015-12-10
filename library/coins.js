var safePositions = require('./moves.js').safePositions;
var ld = require('lodash');
var players = {player1:{},player2:{}}
var diceValue ;
exports.move = function(data,moves,diceValue){
	var notPermitted;
	var cellRoutes = moves[data.coinClass];
	if(Object.keys(players[data.coinClass]) == 0 || players[data.coinClass][data.coinId]==undefined){
		var pos = cellRoutes.indexOf(+data.position);
	}
	else{
		var pos = cellRoutes.indexOf(+players[data.coinClass][data.coinId].position);
	}
	if(!pos && diceValue==6){
		data.position = cellRoutes[pos+1];
		notPermitted=true;
	}
	else if(pos){
		data.position = cellRoutes[pos+diceValue];
		var coinMovement = exports.kill(data);
		notPermitted=(coinMovement);
	}
	players[data.coinClass][data.coinId]=data;
	return notPermitted;
};


exports.kill = function(data){
	var coinMovement = true;
	var killingPlayer1 = [], killingPlayer2 = [], sameCoins1 = [], sameCoins2 = [];
	if(data.coinClass == 'player1'){
		killingPlayer2 = Object.keys(players.player2).filter(function(keys){
			return players.player2[keys].position == data.position;
		});
		sameCoins1 = Object.keys(players.player1).filter(function(keys){
			return players.player1[keys].position == data.position;
		});
	}
	if(data.coinClass == 'player2'){
		killingPlayer1 = Object.keys(players.player1).filter(function(keys){
			return players.player1[keys].position == data.position;
		});
		sameCoins2 = Object.keys(players.player2).filter(function(keys){
			return players.player2[keys].position == data.position;
		});
	}
	if(killingPlayer2.length!=0 && safePositions.indexOf(data.position)<0)
		players.player2[killingPlayer2[0]].position=01;
	if(killingPlayer1.length!=0 && safePositions.indexOf(data.position)<0 )
		players.player1[killingPlayer1[0]].position=00;
	if(sameCoins1.length!=0 && safePositions.indexOf(data.position)<0){
		data.position = players.player1[data.coinId].position;
		coinMovement = false;
	}
	if(sameCoins2.length!=0 && safePositions.indexOf(data.position)<0){
		data.position = players.player2[data.coinId].position;
		coinMovement = false;
	}
	return coinMovement;
};
var rollDice = function(){
	return ld.random(1,6);
};

var Coin = function(colour,id){
	this.colour = colour;
	this.position = false;
	this.id = id;
	this.prevPosition = false;
}

exports.Coin = Coin;
exports.rollDice = rollDice;
exports.players = players;
