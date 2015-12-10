var players = [];


//alerting functions ............................

var warnFull = function(){
	console.log('in warn full');
	$("#loading").hide();
	$('#notice').show();
	$('#warn').html('Oops.. Current game has started');
};
var warnNotEnough = function(){
	$("#loading").hide();
	$('#notice').show();
	$('#warn').html('Sorry you don\'t have enough players to start the game');
};


//...............................................

var showCanvas = function() {
	window.location.href = './board.html';
};

var checkPlayers = function(){
	var interval = setInterval(getPlayers,3000);
	setTimeout(function(){
		clearInterval(interval);
		if(players.length == 1)	warnNotEnough();	
		else if(players.length <= 4) showCanvas();
	},20000);
};

var getPlayers = function(){
	$.get('players',function(data){
		players = JSON.parse(data);console.log(players);
		if (players.length == 2) {
			clearInterval();
			showCanvas();
		};
	});
};

var postGameRequest = function(name) {
	name = name || document.querySelector('input[name="name"]').value;
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4 && req.status == 200){
			var resData = JSON.parse(req.responseText);
			document.querySelector('#welcome-user').innerHTML = 'Welcome, ' + resData.username ;
			document.querySelector('#join').style.display = 'none';
			document.querySelector('#load-player').style.display = 'block';
			if(resData.overflow){
				warnFull();
				return;
			}
			checkPlayers();
		};
	};
	req.open('POST', 'register', true);
	//req.send('name=' + name);
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
