var assert=require('chai').assert;
var Paths=require('../library/paths.js');
var Coin=require('../library/coin.js');
var Colours=require('../library/colours.js');

describe("generatePath",function(){
	it("should create a safe tile as the first tile for all players",function(){
		var paths=Paths.generate();
		assert.equal(4,paths.length);
		var firstTile=paths[0][0];
		var coin1=new Coin(1,Colours.green);
		var coin2=new Coin(2,Colours.green);
		assert.ok(firstTile.canPlaceCoin(coin1));
		firstTile.placeCoin(coin1)
		assert.ok(firstTile.canPlaceCoin(coin2));
	});
});
