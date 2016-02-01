var ld = require('lodash');
var Coin = require('../library/coin.js');
var assert=require('chai').assert;
var sinon = require('sinon');
var Player=require('../library/player.js');

describe("move",function(){
  it("should be able to move a coin by one position",function(){
  	var coin = new Coin(1,'green');
  	var coins = [];
    coins[1]=coin;
    var tile1={};
    var tile2={placeCoin:function(){}};
    var spy=sinon.spy(tile2,"placeCoin");
    var path=[tile1,tile2];
    var player=new Player("Sarath","green",coins,path);
    var coinId = ld.findIndex(coins,{_id:1});
    player.move(coinId,1);
    assert.ok(spy.withArgs(coin).calledOnce);
  });
});
