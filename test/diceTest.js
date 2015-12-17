var diceLib = require('../library/dice.js');
var chai = require('chai');
var assert = chai.assert;

describe('players can role the dice',function(){
  var dice = new diceLib.Dice();
	it('the value given by dice should be between 1-6',function(){
		var diceValue = dice.roll();
		assert.equal(6 >= diceValue >=1	,true);
	});
});
