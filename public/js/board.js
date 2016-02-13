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
		if(data.winner){
      $('#win-modal').addClass('winner-container-show')
      $('#winner-name').html(data.winner+" won the game.")
    }
    $('#username').html(data.player + "'s turn");
    var name = document.cookie.split(/[=;]/)[1];
    if(name == data.player){
      $('#cut-lbl').html(data.kills);
      $('#final-lbl').html(data.destinationCoins);
      $('#shed-lbl').html(data.homeCoinCount);
    };
    $('.dice-lbl').html(data.diceValue);
    changeDice(data.diceValue);
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
      $('.player1').html(data.players[0].name);
      $('.player2').html(data.players[1].name);
      if(data.length>2){
        $('.player3').html(data.players[2].name);
        $('.player4').html(data.players[3].name);
      }
  },'json');
};

var showPlayersCoins=function(){
   $.post('/getPlayerCoins',function(data){
    console.log(data[0]._name,'=====');
         $('.player1').html(data[0]._name);
         $('.player2').html(data[1]._name);
         if($('.player3').html(data[2]._name)){
             $('.player3').html(data[2]._name);
         }
         if($('.player4').html(data[3]._name)){
             $('.player4').html(data[3]._name);
       }
   },'json');
 };
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
  showPlayersCoins();
  setInterval(update, 1000);
};

$.ready(onload);
