var ld = require('lodash');
var Player = function(name,colour,coins,path){
	this._name = name;
	this._colour = colour;
	this._coins = coins;
	this._path = path;
};

Player.prototype = {
	move:function(coinId,diceValue){
		var coinToMove = this.getCoinById(coinId);
		var coinPosition = coinToMove.getPosition();
		var destinationIndex = (coinPosition)? coinPosition+diceValue : (diceValue==6)? 1:0;
		var tile = this._path[destinationIndex];
		tile.placeCoin(coinToMove);
		coinToMove.updatePosition(destinationIndex);
	},
	getCoinById : function(id){
		return  ld.find(this._coins,{_id:id});
	}

};

module.exports = Player;
