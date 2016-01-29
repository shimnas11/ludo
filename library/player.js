var Player = function(name,colour,coins,path){
	this.name=name;
	this.colour=colour;
	this.coins=coins;
	this.path=path;
}

Player.prototype = {
	move:function(coinId,diceValue){
		var coinToMove=this.coins[coinId];
		var destinationIndex=coinToMove.getPosition()+diceValue;
		var tile=this.path[destinationIndex];
		tile.placeCoin(coinToMove);
	}
}

module.exports = Player;
