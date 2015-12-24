//alerting functions ............................
var warn = function(message){
	$("#loading").hide();
	$('#notice').show();
	$('#warn').html(message);
};
//...............................................

var showCanvas = function() {
	window.location.href = './board.html';
};

var isReady = function(){
	$.get('ready',function(data){
		var game = JSON.parse(data);
		if (game.ready)
			showCanvas();
	});
};

var checkPlayers = function(){
	var interval = setInterval(isReady,1000);
};

var onRegisterResponse = function(reg){
	reg = JSON.parse(reg);
	$('#join').hide();
	$('#load-player').show();
	if(!reg.success){
		warn('Oops,..Current game started');
		return;
	}
	checkPlayers();
};

var postGameRequest = function(name) {
	var name=document.querySelector('input[name="name"]').value
	$.post('/register',{name:name},onRegisterResponse);
};

//rerequest while no player is joined ...........................................

var reRequest = function(){
	var name = document.cookie.split('=')[1];
	$("#loading").show();
	var req_result = postGameRequest(name);
};

window.onload = function(){
	document.querySelector('#register').onclick = postGameRequest;
	document.querySelector('#Retry').onclick = reRequest;
};
