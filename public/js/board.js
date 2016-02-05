var stateOfGame;

var move = function(coin){
	var coinId = coin.id.split('-')[1];
	$.post('/move',{coinId:coinId,colour:coin.className},function(data){
		update();
	})
}

var update = function(){
	$.get('/getStatus',function(data){
		for(coin of data){
			if(coin._position){
				$('#'+coin._position.split(',').join('')).append($('#c-'+coin._id));
			}
			else {
				var temp = Math.ceil(coin._id/4);
				$('#h'+temp).append($('#c-'+coin._id));
			}
		}
	},'json')
}
var placeCoins=function(){

}

var rollDice = function(dice){
	$.post('/dice',function(data){
		console.log(data);
		$('#dice').html(data.diceValue);
	},'json');
}

var onload = function() {
  setInterval(function(){
  	update()}, 10000);
};

$.ready(onload());