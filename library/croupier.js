var ld = require('lodash');

var Croupier = function(Game) {
  this._games = [];
  this.Game = Game;
}

Croupier.prototype = {
  addGame: function(size, name) {
    var game = new this.Game(+size, this._games.length + 1);
    game.addPlayer(name);
    this._games.push(game);
  },
  getAllGames: function(handler) {
    console.log(handler);
    return this._games.map(handler);
  },
  getGameById: function(id) {
    var game = ld.find(this._games, {
      _id: +id
    });
    console.log(game);
    return game;
  }
}

module.exports = Croupier;
