var stateOfGame;

var move = function() {
  var id = this.id.split('-')[1];
  var colour = this.className.split(' ')[1];
  $.post('/move', {
    coinId: id,
    colour: colour,
    playerName: document.cookie.split(/[=;]/)[1]
  }, function(data) {
    update();
  })
}

var updateCoins = function(coins) {
  for (coin of coins) {
    if (coin._position)
      $('#' + coin._position.split(',').join('')).append($('#c-' + coin._id));
    else {
      var temp = Math.ceil(coin._id / 4);
      $('#h' + temp).append($('#c-' + coin._id));
    }
  }
}

var enablePlayerIFTurn = function (player) {
  var user = document.cookie.split(/[=;]/)[1];
  if(user == player._name){
    $('.'+player._colour).on('click');
    $('.dice').on('click');
  }
}

var update = function() {
  $.get('/getStatus', function(data) {
    $('.main-container').off('click');
    $('#username').html(data.player._name + "'s");
    $('.dice-lbl').html(data.diceValue);
    enablePlayerIFTurn(data.player);
    updateCoins(data.coins);
  }, 'json')
}
var placeCoins = function() {

}

var rollDice = function(dice) {
  $.post('/dice', function(data) {
    $('.dice-lbl').html(data.diceValue);
    // $('.dice').html(data.diceValue);
  }, 'json');
}

var onload = function() {
  $('.dice').click(rollDice);
  $('.coin').click(move);
  setInterval(update, 1000);
};

$.ready(onload);
