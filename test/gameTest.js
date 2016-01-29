var ld = require('lodash');
var Game = require('../library/game');
var assert = require('chai').assert;

describe('Game', function(){
	describe('Add Player', function(){
		var game = new Game(2)
		it('can add new player to the game',function(){
	      game.addPlayer('alex');
	      assert.ok(game._players.length == 1);
	      assert.ok(ld.findIndex(game._players,{name:'alex'})==0);
	    })
	    it('after max players, no other players are added',function(){
	      game.addPlayer('a');
	      game.addPlayer('casper')
	      console.log(game._players);
	      assert.equal(game._players.length,2);
	      assert.ok(ld.findIndex(game._players,{name:'casper'})<0);
	    })
	});
});