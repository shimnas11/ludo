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
		if(data.player._destinationCoins == 4){
      $('#win-modal').addClass('winner-container-show')
      $('#win-text').html(data.player._name)
    }
    $('#username').html(data.player._name + "'s");
    $('.dice-lbl').html(data.diceValue);
    changeDice(data.diceValue);
    enablePlayerIFTurn(data.player);
    updateCoins(data.coins);
  }, 'json')
}

var rollDice = function(dice) {
  $.post('/dice', function(data) {
     $('.dice').html('<img src="./images/d'+data.diceValue+'.gif">');
    $('.dice-lbl').html(data.diceValue);
    changeDice(data.diceValue);
  }, 'json');
}

var changeDice=function(diceValue){
    if(diceValue==null)
          return;
    $('.dice').attr('src','images/d'+diceValue+'.gif')
}

var showPlayersCoins=function(){
  $.post('/getPlayerCoins',function(data){
        console.log(data._players,'====')
        $('.player1').html(data[0]._name);
        $('.colour1').html(data[0]._colour);
        $('.player2').html(data[1]._name);
        $('.colour2').html(data[1]._colour);
        if($('.player3').html(data[2]._name)){
            console.log('333333333333')
            $('.player3').html(data[2]._name);
            $('.colour3').html(data[2]._colour);
        }
        if($('.player4').html(data[3]._name)){
            console.log('44444444444444')
            $('.player4').html(data[3]._name);
            $('.colour4').html(data[3]._colour);
      }
  },'json');
};

var onContinueClick = function () {
	$.post('/endGame',function(data){
		if (data.status) {
			window.location = '/chooseGame.html'
		}
	});
}

var onload = function() {
  $('.dice').click(rollDice);
  $('.coin').click(move);
  showPlayersCoins();
  setInterval(update, 1000);
};

$.ready(onload);
