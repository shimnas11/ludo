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
		it("it should move coin according to the dice value", function(){
			game.addPlayer('alex');
			game.addPlayer('casper');
			var coin = {id:5,colour:'blue'};
			game.getDiceValue = sinon.stub().returns(2);
			game.moveCoin(coin);
			assert.equal(game._players[1]._coins[0]._position,2);

		});
	});
});