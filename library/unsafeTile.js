var UnsafeTile=function(id) {
  this.id=id;
  this.coin=null;
}

UnsafeTile.prototype = {
  placeCoin:function(coin) {
    if(this.coin)
      this.coin.die();
    this.coin=coin;
  },
  canPlaceCoin:function(coin) {
    if(this.coin && this.coin.isSameColourAs(coin))
      return false;
    return true;
  },
  numberOfCoins:function() {
    return this.coin?1:0;
  },
	isEqual:function(tile) {
		return this===tile;
	}

}
module.exports=UnsafeTile;
