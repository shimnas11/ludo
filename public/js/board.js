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

var update = function() {
  $.get('/getStatus', function(data) {
		if(data.player._destinationCoins == 4)

    $('.main-container').off('click');
    $('#username').html(data.player._name + "'s");
    $('.dice-lbl').html(data.diceValue);
    updateCoins(data.coins);
  }, 'json')
}

var rollDice = function(dice) {
  $.post('/dice', function(data) {
    $('.dice-lbl').html(data.diceValue);
    // $('.dice').html(data.diceValue);
  }, 'json');
}

var onContinueClick = function () {
	$.post('/endGame',function(data){
		if (data.status) {
			window.location = '/chooseGame.html'
		}
	}
}

var onload = function() {
  $('.dice').click(rollDice);
  $('.coin').click(move);
  setInterval(update, 1000);
};

$.ready(onload);
