var assert = require('chai').assert;
var expect = require('chai').expect;
var Player = require('../library/player');

describe('Player',function(){
    it('is created without any chance and kill',function(){
      var player = new Player('alex','red');
      assert.equal(player.kill,0);
      assert.equal(player.chance,0);
    });

    it('can add and remove bonus chances',function(){
      var player = new Player('alex','red');
      player.addOneBonus();
      assert.equal(player.chance,1);
      player.removeOneBonus();
      assert.equal(player.chance,0);
    });

    it('can have new kills',function(){
      var player  = new Player('alex','red');
      player.addOneKill();
      assert.equal(player.kill,1);
    });
});
