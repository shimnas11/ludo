var Game = require('../library/game');
var assert = require('chai').assert;
var sinon = require('sinon');
var ld = require('lodash');

describe('Game', function(){
	describe('Add Player', function(){
		var game = new Game(2)
		it('can add new player to the game',function(){
	      game.addPlayer('alex');
	      assert.ok(game._players.length == 1);
	      assert.ok(ld.findIndex(game._players,{_name:'alex'})==0);
	    });
	    it('after max players, no other players are added',function(){
	      game.addPlayer('a');
	      game.addPlayer('casper')
	      assert.equal(game._players.length,2);
	      assert.ok(ld.findIndex(game._players,{_name:'casper'})<0);
	    })
	});
	describe("coin movement", function(){
		var game = new Game(2);
		game.addPlayer('alex');
		game.addPlayer('casper');
		it("it should not enter to the board without dice value six", function(){
			var coin = {coinId:1,colour:'yellow'};
			game._diceValue = 2;
			game.moveCoin(coin);
			assert.equal(game._players[1]._coins[0]._position,null);

		});
		it("it should place the coin on the board if the dice value is six", function(){
			var coin = {coinId:5,colour:'blue'};
			game._diceValue = 6;
			game.moveCoin(coin);
			assert.equal(game._players[1]._coins[0]._position,'2,4');

		});
		it("it should place the coin according to the dice value", function(){
			var coin = {coinId:5,colour:'blue'};
			game._diceValue = 2;
			game.moveCoin(coin);
			assert.equal(game._players[1]._coins[0]._position,'0,4');

		});
	});
});