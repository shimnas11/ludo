var ld = require('lodash');

var Dice = function(){
  this._currentValue = 1;
}

Dice.prototype={
  get diceValue(){
    return this._currentValue;
  },

  roll : function(){
    this._currentValue = ld.random(1,6);
    return this.diceValue;
  }
}

exports.Dice = Dice;
