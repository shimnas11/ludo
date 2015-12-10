var Coin = require('./coins.js').Coin;

var generateCoins = function(color){
	var coins = [];
	for (var i = 0; i < 4; i++)
		coins.push(new Coin(color,i));
	return coins;
}

var Player = function(name,color){
	this.name = name;
	this.color = color;
	this.coins = generateCoins(color);
	this.kill = 0;
	this.chance = 0;
}

exports.Player = Player;
