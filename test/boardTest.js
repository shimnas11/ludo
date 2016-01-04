var assert = require('chai').assert;
var Board = require('../library/board.js');

describe('Board',function(){
  describe('findTileIndexOfCoin',function(){
    var board = new Board;
    it('should give the index null when the given coin is out of the board',function(){
      var coin = { color: 'green', position: null, id: 2, prevPosition: null };
      var index = board.findTileIndexOfCoin(coin);
      assert.equal(index,null);
    });
    it('should give the index when the given coin is in the board',function(){
      var coin = { color: 'green', position: '00', id: 2, prevPosition: null };
      var index = board.findTileIndexOfCoin(coin);
      assert.equal(index,2);
    });
  });
  describe('findNextPosition',function(){
    var board = new Board;
    it('should give the next position of a coin when the coin is out of the board and dice value is 6',function(){
      var coin = { color: 'green', position: null, id: 2, prevPosition: null };
      var diceValue = 6;
      var position = board.findNextPosition(coin,diceValue);
      assert.equal(position,'02');
    });
    it('should give the next position of a coin when the coin is on the board',function(){
      var coin = { color: 'green', position: '00', id: 2, prevPosition: null };
      var diceValue = 5;
      var position = board.findNextPosition(coin,diceValue);
      assert.equal(position,'41');
    });
    it("should not give the next position of a coin when the coin is out of the board and dice value isn't 6",function(){
      var coin = { color: 'green', position: null, id: 2, prevPosition: null };
      var diceValue = 4;
      var position = board.findNextPosition(coin,diceValue);
      assert.equal(position,null);
    });
  });
});
