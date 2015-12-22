var Player = function(name,coins){
	this.name = name;
	this._coins = coins;
	this._kill = 0;
	this._chance = 0;
	this.isMyTurn = false;
}

Player.prototype =  {
	get coins(){
		return this._coins;
	},
	getCoinColour : function(){
		return (this._coins.length==0) ? null: this._coins[0].colour;
	},
	getCoin : function(coinId){
		return (coinId) ? this._coins[coinId] : null;
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
