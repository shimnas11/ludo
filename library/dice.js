var ld = require('lodash');

var Dice = function(){
  this._value = 1;
}

Dice.prototype={
  get value(){
    return this._value;
  },

  roll : function(){
    this._value = ld.random(1,6);
    return this._value;
  }
}

module.exports = Dice;
