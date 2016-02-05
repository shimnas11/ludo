var ld = require('lodash');
var Player = function(name,colour,coins,path){
	this._name = name;
	this._colour = colour;
	this._coins = coins;
	this._path = path;
};

Player.prototype = {
	move:function(coinId,diceValue){
		var coinToMove = this.getCoinById(+coinId);
		var coinPosition = coinToMove.getPosition();
		var position = ld.findIndex(this._path,{_id:coinPosition});
		var destinationIndex = (position>=0)? position+diceValue : (diceValue==6)? 0:null;
		if(destinationIndex == null) 
			return ;
		var tile = this._path[destinationIndex];
		tile.placeCoin(coinToMove);
		coinToMove.updatePosition(tile._id);
	},
	getCoinById : function(id){
		return  ld.find(this._coins,{_id:id});
	}

};

module.exports = Player;
