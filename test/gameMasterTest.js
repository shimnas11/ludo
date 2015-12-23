var assert = require('chai').assert;
var gameLib = require('../library/gameMaster');

describe('gameMaster',function(){
  describe('addPlayer',function(){
    var game = new gameLib(2);
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
    var game = new gameLib(4);
    it('the next player will get the turn',function(){
      game.addPlayer('a');
      assert.ok(game.getPlayer('a').coins.length,4);
      assert.ok(game.getPlayer('a').getCoinColour(),'green');

      game.addPlayer('b');
      assert.ok(game.getPlayer('b').coins.length,4);
      assert.ok(game.getPlayer('b').getCoinColour(),'yellow');

      game.addPlayer('c');
      assert.ok(game.getPlayer('c').coins.length,4);
      assert.ok(game.getPlayer('c').getCoinColour(),'blue');

      game.addPlayer('d');
      assert.ok(game.getPlayer('d').coins.length,4);
      assert.ok(game.getPlayer('d').getCoinColour(),'red');

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
});
