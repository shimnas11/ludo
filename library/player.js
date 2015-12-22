var Coin = require('./coins.js').Coin;

var generateCoins = function(color,count){
	var coins = [];
	for (var i = 0; i < count; i++)
		coins.push(new Coin(color,i));
	return coins;
}

var Player = function(name,color){
	this.name = name;
	this.color = color;
	this._coins = generateCoins(color,4);
	this._kill = 0;
	this._chance = 0;
	this.isMyTurn = false;
}

Player.prototype =  {

	getCoin : function(coinId){
		return (coinId ? this._coins[coinId] : this._coins);
	},
	get chance(){
		return this._chance;
	},
	get kill(){
		return this._kill;
	},
	addOneBonus : function(){
		this._chance++;
	},
	addOneKill : function() {
		this._kill++
	},
	removeOneBonus : function(){
		this._chance--;
	}
};

module.exports = Player;
