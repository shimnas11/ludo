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
	get color(){
		return this.coins[0].color;
	},
	// getCoinColour : function(){
	// 	return this.coins[0].color;
	// },
	getCoin : function(id){
		return (id) ? this.coins[id-1] : this.coins;
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
