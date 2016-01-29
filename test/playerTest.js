var assert=require('chai').assert;
var sinon = require('sinon');
var Player=require('../library/player.js');

describe("move",function(){
  it("should be able to move a coin by one position",function(){
    var coin={getPosition:sinon.stub().returns(0),
              coinId:sinon.stub().returns(1)};
    var coins={};
    coins[coin.coinId()]=coin;
    var tile1={};
    var tile2={placeCoin:function(){}};
    var spy=sinon.spy(tile2,"placeCoin");
    var path=[tile1,tile2];
    var player=new Player("Sarath","green",coins,path);
    player.move(coin.coinId(),1);
    assert.ok(spy.withArgs(coin).calledOnce);
  });
});
