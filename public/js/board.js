var stateOfGame;

var move = function() {
  var id = this.id.split('-')[1];
  var colour = this.className.split(' ')[1];
  $.post('/move', {
    coinId: id,
    colour: colour,
    playerName: document.cookie.split(/[=;]/)[1]
  }, update)
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
    console.log("====",data.player);
		if(data.winner){
      $('#win-modal').addClass('winner-container-show')
      $('#win-text').html(data.player._name+" won the game.")
    }
    $('#username').html(data.player._name + "'s");
    $('.dice-lbl').html(data.diceValue);
    $('.dice').html('<img src="./images/d'+data.diceValue+'.gif">');
    updateCoins(data.coins);
  }, 'json')
}

var rollDice = function(dice) {
  $.post('/dice', function(data) {
     $('.dice').html('<img src="./images/d'+data.diceValue+'.gif">');
    $('.dice-lbl').html(data.diceValue);
    // $('.dice').html(data.diceValue);
  }, 'json');
}

var onContinueClick = function () {
	$.get('/endGame',function(data){
		if (data.status) {
			window.location = 'http://localhost:8080/chooseGame.html'
		}
	});
}

var onload = function() {
  $('.dice').click(rollDice);
  $('.coin').click(move);
  setInterval(update, 1000);
};

$.ready(onload);
