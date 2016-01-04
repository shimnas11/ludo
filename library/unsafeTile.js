var UnsafeTile=function(id) {
  this.id=id;
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
  }
}
module.exports=UnsafeTile;
