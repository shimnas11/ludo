var players = [];

var showCanvas = function() {
	window.location.href = './board.html';
};

var checkPlayers = function(){
	var interval = setInterval(getPlayers,3000);
	setTimeout(function(){
		clearInterval(interval);
		if(players.length == 1){
			document.querySelector('#loading').style.display = 'none';
			document.querySelector('#warn-not-enough').style.display = 'block';
		}
		else if(players.length <= 4)	showCanvas();
		else{
			document.querySelector('#loading').style.display = 'none';
			document.querySelector('#warn-full').style.display = 'block';
		};
	},20000);
};

var getPlayers = function(){
	$.get('players',function(data){
		players = JSON.parse(data);console.log(players);
		if (players.length == 4) {
			clearInterval();
			showCanvas();
		};
	});
};

var postGameRequest = function() {
	var req = new XMLHttpRequest();
	req.onreadystatechange = function(){
		if(req.readyState == 4 && req.status == 200){
			var resData = JSON.parse(req.responseText);
			document.querySelector('#welcome-user').innerHTML = 'Welcome, ' + resData.username ;
			document.querySelector('#join').style.display = 'none';
			document.querySelector('#load-player').style.display = 'block';
			checkPlayers();
		};
	};
	req.open('POST', 'register', true);
	req.send('name=' + document.querySelector('input[name="name"]').value);
};

window.onload = function(){
	document.querySelector('#register').onclick = postGameRequest;
};
