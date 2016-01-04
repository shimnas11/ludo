var assert = require('chai').assert;
var Game = require('../library/gameMaster');
var sinon = require('sinon');

describe('gameMaster',function(){
  describe('addPlayer',function(){
    var game = new Game(2);
    it('can add new player to the game',function(){
      game.addPlayer('alex');
      assert.ok(game.players.length == 1);
      assert.ok(game.players[0].isMyTurn);
    })
    it('with multiple players the first player should get the turn',function(){
      game.addPlayer('a');
      assert.ok(game.players.length == 2);

      assert.ok(game.players[0].isMyTurn);
      assert.notOk(game.players[1].isMyTurn);
    })
  });

  describe('changeTurn',function(){
    var game = new Game(4);
    it('the next player will get the turn',function(){
      game.addPlayer('a');
      assert.equal(game.getPlayer('a').coins.length,4);
      assert.equal(game.getPlayer('a').color,'green');

      game.addPlayer('b');
      assert.equal(game.getPlayer('b').coins.length,4);
      assert.equal(game.getPlayer('b').color,'yellow');

      game.addPlayer('c');
      assert.equal(game.getPlayer('c').coins.length,4);
      assert.equal(game.getPlayer('c').color,'blue');

      game.addPlayer('d');
      assert.equal(game.getPlayer('d').coins.length,4);
      assert.equal(game.getPlayer('d').color,'red');

      assert.ok(game.players[0].isMyTurn);

      game.changeTurn();
      assert.notOk(game.players[0].isMyTurn);
      assert.ok(game.players[1].isMyTurn);
    })
    it('the first player should get the chance after the last player',function(){
      game.changeTurn();
      game.changeTurn();

      assert.ok(game.players[3].isMyTurn);

      game.changeTurn();

      assert.ok(game.players[0].isMyTurn);
      assert.notOk(game.players[1].isMyTurn);
      assert.notOk(game.players[2].isMyTurn);
      assert.notOk(game.players[3].isMyTurn);
    })
  });
  describe('getPlayer',function(){
    var game = new Game(4);
    it('finds the player by the given name',function(){
      game.addPlayer('a');
      game.addPlayer('b');
      game.addPlayer('c');
      game.addPlayer('d');

      assert.ok(game.getPlayer('a').color,'green');
      assert.ok(game.getPlayer('b').color,'yellow');
      assert.ok(game.getPlayer('c').color,'blue');
      assert.ok(game.getPlayer('d').color,'red');
    })
  });
  describe('findPlayerWithCoinColour',function(){
    var game = new Game(4);
    it('the player with coin colour should be identified',function(){
      game.addPlayer('a');
      game.addPlayer('b');
      game.addPlayer('c');
      game.addPlayer('d');

      assert.equal(game.findPlayerWithCoinColour('green').name,'a');
      assert.equal(game.findPlayerWithCoinColour('yellow').name,'b');
      assert.equal(game.findPlayerWithCoinColour('blue').name,'c');
      assert.equal(game.findPlayerWithCoinColour('red').name,'d');
    });
  });
  // -----------------------------------------------------
  describe('movement of coin',function(){
    var game = new Game(4);
    game.addPlayer('a');
    game.addPlayer('b');
    game.addPlayer('c');
    game.addPlayer('d');

  });
});
