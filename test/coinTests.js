var lib = require('../library/coins.js');
var chai = require('chai');
var assert = chai.assert;

describe('movement of coin',function(){
	var path = {player1:[13,12,11,21,22,31,41,51,52,53,54,55,45,35,25,15,14,24,34,44,43],
		player2:[54,53,4,5,32,1,2,34,2,31,23,44,23,24,25,43,41]};
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
		assert.equal(data.position,32);
	});
	it("player2's coin 4 should move according to the dice value",function(){
		var data = {coinClass:'player2', coinId:4, position:54};
		var diceValue = 1;
		lib.move(data,path,diceValue);
		assert.equal(data.position,53);
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
		assert.equal(data.position,31);
	});
});