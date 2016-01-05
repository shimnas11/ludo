var SafeTile=function(id) {
	this._id=id;
	this._coins=[];
}

SafeTile.prototype = {
	canPlaceCoin:function(coin) {
		return true;
	},
	placeCoin:function(coin) {
		this._coins.push(coin);
	}
}

module.exports = SafeTile;
