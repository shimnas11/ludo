var Coin=function(id,colour) {
	this._id=id;
	this._colour=colour;
}

Coin.prototype={
	isSameColourAs:function(otherCoin) {
		return this._colour==otherCoin._colour;
	}
}

module.exports=Coin;
