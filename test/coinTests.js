var lib = require('../library/coins.js');
var chai = require('chai');
var assert = chai.assert;

var path = {player1:[13,12,11,21,22,31,41,51,52,53,54,55,45,35,25,15,14,24,34,44,43],
	player2:[53,54,4,5,32,1,2,34,2,31,11,23,44,23,24,25,43,41]};
describe('movement of coin',function(){
	it("player1's coin 1 should move according to the dice value",function(){
		var data = {coinClass:'player1', coinId:1, position:13};
		var diceValue = 2;
		lib.move(data,path,diceValue);
		assert.equal(data.position,11);
	});
	it("player1's coin 2 should move according to the dice value",function(){
		var data = {coinClass:'player1', coinId:2, position:13};
		var diceValue = 5;
		lib.move(data,path,diceValue);
		assert.equal(data.position,31);
	});
	it("player2's coin 1 should move according to the dice value",function(){
		var data = {coinClass:'player2', coinId:1, position:54};
		var diceValue = 4;
		lib.move(data,path,diceValue);
		assert.equal(data.position,1);
	});
	it("player2's coin 4 should move according to the dice value",function(){
		var data = {coinClass:'player2', coinId:4, position:54};
		var diceValue = 1;
		lib.move(data,path,diceValue);
		assert.equal(data.position,4);
	});
	it("player1's coin 2 should move according to the dice value from its previous position",function(){
		var data = {coinClass:'player1', coinId:2, position:13};
		var diceValue = 5;
		lib.move(data,path,diceValue);
		assert.equal(data.position,54);
	});
	it("player2's coin 1 should move according to the dice value from its previous position",function(){
		var data = {coinClass:'player2', coinId:1, position:13};
		var diceValue = 5;
		lib.move(data,path,diceValue);
		assert.equal(data.position,11);
	});
});

describe("killing player1's coins by player2",function(){
	var data = {coinClass:'player2', coinId:1, position:54};
	var diceValue = 1;
	it("once a player2 coin overlapped with player1's coin, player1's coin should go to its satarting position",function(){
		lib.move(data,path,diceValue)
		assert.equal(lib.players.player1['1'].position,0);
	});
	it("player2's coin should be in the position of player1",function(){
		assert.equal(lib.players.player2['1'].position,23)
	});
});

describe("killing player2's coins by player1",function(){
	var data = {coinClass:'player1', coinId:1, position:54};
	var diceValue = 1;
	it("once a player1 coin overlapped with player2's coin, player2's coin should go to its satarting position",function(){
		lib.move(data,path,diceValue)
		assert.equal(lib.players.player2['1'].position,23);
	});
	it("player1's coin should be in the position of player2",function(){
		assert.equal(lib.players.player1['1'].position,13)
	});
});

describe('players can role the dice',function(){
	var player = {turn:true,diceValue:0};
	it('the value given by dice should be between 1-6',function(){
		lib.rollDice(player);
		assert.equal([1,2,3,4,5,6].indexOf(player.diceValue)>=0,true);
	});

	it('if the turn is not valid dont roll the dice ',function(){
		player.turn=false;
		lib.rollDice(player);
		assert.equal([1,2,3,4,5,6].indexOf(player.diceValue)>=0,false);
	})
});	
