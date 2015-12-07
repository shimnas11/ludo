var safePositions = require('./moves.js').safePositions;
var players = {player1:{},player2:{}}
exports.move = function(data,moves,diceValue){
	var cellRoutes = moves[data.coinClass];
	if(Object.keys(players[data.coinClass]) == 0 || players[data.coinClass][data.coinId]==undefined)
		var pos = cellRoutes.indexOf(data.position);			
	else
		var pos = cellRoutes.indexOf(players[data.coinClass][data.coinId].position);
	
	data.position = cellRoutes[pos+diceValue];
	exports.kill(data);
	players[data.coinClass][data.coinId]=data;
};


exports.kill = function(data){
	var killingPlayer1 = [],killingPlayer2 = [];
	if(data.coinClass == 'player1'){
		killingPlayer2 = Object.keys(players.player2).filter(function(keys){
			return players.player2[keys].position == data.position
		});
	}
	if(data.coinClass == 'player2'){
		killingPlayer1 = Object.keys(players.player1).filter(function(keys){
			return players.player1[keys].position == data.position
		});
	}
	if(killingPlayer2.length != 0 && safePositions.indexOf(data.position)<0)
		players.player2[killingPlayer2[0]].position=01;
	if(killingPlayer1.length!=0 && safePositions.indexOf(data.position)<0)
		players.player1[killingPlayer1[0]].position=00;
};

exports.players=players;