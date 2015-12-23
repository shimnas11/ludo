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

var checkPlayers = function(){
	var interval = setInterval(isReady,1000);
};

var isReady = function(){
	$.get('ready',function(data){
		var game = JSON.parse(data);
		if (game.ready)
			showCanvas();
	});
};

var postGameRequest = function(name) {
	name = name || document.querySelector('input[name="name"]').value;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4 && req.status == 200){
			var register = JSON.parse(req.responseText);
			// document.querySelector('#welcome-user').innerHTML = 'Welcome, ' + resData.username ;
			document.querySelector('#join').style.display = 'none';
			document.querySelector('#load-player').style.display = 'block';
			if(!register.done){
				warn('Oops,..Current game started');
				return;
			}
			checkPlayers();
		};
	};
	req.open('POST', 'register', true);
	req.send('name=' + document.querySelector('input[name="name"]').value);
};

//rerequest while no player is joined ...........................................

var reRequest = function(){
	var cookie = document.cookie;
	$("#loading").show();
	var req_result = postGameRequest(cookie);
};

window.onload = function(){
	document.querySelector('#register').onclick = postGameRequest;
	document.querySelector('#Retry').onclick = reRequest;
};
