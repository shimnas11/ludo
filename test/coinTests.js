var lib = require('../library/coins.js');
var chai = require('chai');
var assert = chai.assert;
var paths = require('../library/moves.js').players;

describe('movement of coin',function(){
	it("player1's coin 1 should move according to the dice value",function(){
		var data = {coinClass:'player1', coinId:1, position:13};
		var diceValue = 2;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['1'].position,11);
	});
	it("player1's coin 2 should move according to the dice value",function(){
		var data = {coinClass:'player1', coinId:2, position:13};
		var diceValue = 5;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['2'].position,41);
	});
	it("player2's coin 1 should move according to the dice value",function(){
		var data = {coinClass:'player2', coinId:1, position:53};
		var diceValue = 4;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player2['1'].position,35);
	});
	it("player2's coin 4 should move according to the dice value",function(){
		var data = {coinClass:'player2', coinId:4, position:53};
		var diceValue = 1;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player2['4'].position,54);
	});
	it("player1's coin 2 should move according to the dice value from its previous position",function(){
		var data = {coinClass:'player1', coinId:2, position:13};
		var diceValue = 3;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['2'].position,53);
	});
	it("player2's coin 1 should move according to the dice value from its previous position",function(){
		var data = {coinClass:'player2', coinId:1, position:13};
		var diceValue = 5;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player2['1'].position,12);
	});
});

describe("killing player1's coins by player2",function(){
	var data = {coinClass:'player2', coinId:1, position:53};
	var diceValue = 1;
	it("once a player2 coin overlapped with player1's coin, player1's coin should go to its satarting position",function(){
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['1'].position,0);
	});
	it("player2's coin should be in the position of player1",function(){
		assert.equal(lib.players.player2['1'].position,11)
	});
});

describe("killing player2's coins by player1",function(){
	var data = {coinClass:'player1', coinId:4, position:13};
	var diceValue = 9;
	it("once a player1 coin overlapped with player2's coin, player2's coin should go to its starting position",function(){
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player2['4'].position,01);
	});
	it("player1's coin should be in the position of player2",function(){
		assert.equal(lib.players.player1['4'].position,54)
	});
});

describe("safe position",function(){
	it("a safe position can hold different players coins",function(){
		var data = {coinClass:'player1', coinId:4, position:13};
		var diceValue = 3;
		lib.move(data,paths,diceValue);
		data = {coinClass:'player2', coinId:3, position:53};
		diceValue = 4;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['4'].position,35);
		assert.equal(lib.players.player2['3'].position,35);
	});
	it("a safe position can hold same player coins",function(){
		var data = { coinClass: 'player1', coinId: 2, position: 13 };
		var diceValue = 4;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['2'].position,35);
		assert.equal(lib.players.player1['4'].position,35);
		assert.equal(lib.players.player2['3'].position,35);
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

describe("player's coin should not enter the board until the dice valur is six",function(){
	var data = { coinClass: 'player1', coinId: 3, position: 0 };
	it("player1 coin 3 when the dice value is not six",function(){
		var diceValue = 3;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['3'].position,0);
	});
	it("player1 coin 3 when the dice value is six",function(){
		var diceValue = 6;
		lib.move(data,paths,diceValue);
		assert.equal(lib.players.player1['3'].position,13);
	});
});
