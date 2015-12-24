var assert = require('chai').assert;
var expect = require('chai').expect;
var gameLib = require('../library/game');
var ld = require('lodash');

describe('gameMaster can add players',function(){
  var game = new gameLib(2);

  it('add new player to the game',function(){
    game.addPlayer('alex');
    assert.ok(game.players.length == 1);
    assert.ok(game.players[0].isMyTurn);
  });
  it('with multiple players the first player should get the turn',function(){
    game.addPlayer('a');
    assert.ok(game.players.length == 2);

    assert.ok(game.players[0].isMyTurn);
    assert.notOk(game.players[1].isMyTurn);
  });
});

describe('gameMaster can change player\'s turn',function(){
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
    assert.ok(game.getPlayer('d').getCoinColour(),'blue');

    assert.ok(game.players[0].isMyTurn);

    game.changeTurn();
    assert.notOk(game.players[0].isMyTurn);
    assert.ok(game.players[1].isMyTurn);
  });
  it('the first player should get the chance after the last player',function(){
    game.changeTurn();
    game.changeTurn();

    assert.ok(game.players[3].isMyTurn);

    game.changeTurn();

    assert.ok(game.players[0].isMyTurn);
    assert.notOk(game.players[1].isMyTurn);
    assert.notOk(game.players[2].isMyTurn);
    assert.notOk(game.players[3].isMyTurn);
  });
});

describe('gameMaster can change player\'s turn',function(){
  var game = new gameLib(4);

  it('the player with coin colour should be identified',function(){
    game.addPlayer('a');
    assert.ok(game.getPlayer('a')._coins[0].colour,'green');

    game.addPlayer('b');
    assert.ok(game.getPlayer('b')._coins[0].colour,'yellow');

    game.addPlayer('c');
    assert.ok(game.getPlayer('c')._coins[0].colour,'blue');
    
    game.addPlayer('d');
    assert.ok(game.getPlayer('d')._coins[0].colour,'blue');

    assert.ok(game.findPlayerWithCoinColour('blue').name,'c');
    assert.ok(game.findPlayerWithCoinColour('green').name,'a');
    assert.ok(game.findPlayerWithCoinColour('red').name,'d');
    assert.ok(game.findPlayerWithCoinColour('yellow').name,'b');
  });
});