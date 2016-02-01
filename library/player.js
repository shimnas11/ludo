var ld=require('lodash');
var Player = function(name,colour,coins,path){
	this._name=name;
	this._colour=colour;
	this._coins=coins;
	this._path=path;
}

Player.prototype = {
	move:function(coinId,diceValue){
		var coinToMove=this.getCoinById(coinId);
		var destinationIndex=coinToMove.getPosition()+diceValue;
		var tile=this._path[destinationIndex];
		tile.placeCoin(coinToMove);
		coinToMove.updatePosition(destinationIndex);
	},
	getCoinById : function(id){
		return  ld.find(this._coins,{_id:id});
	}

}

module.exports = Player;
