var players = {player1:{},player2:{}}
exports.move = function(data,moves,diceValue){

	var cellRoutes = moves[data.coinClass];
		if(Object.keys(players[data.coinClass])==0 || players[data.coinClass][data.coinId]==undefined)
			var pos = cellRoutes.indexOf(data.position);			
		else
			var pos = cellRoutes.indexOf(players[data.coinClass][data.coinId].position);

	data.position = cellRoutes[pos+diceValue];
	players[data.coinClass][data.coinId]=data;
};
