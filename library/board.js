var Board = function(){
	this.tiles = [
		{position:'00',coins:[],isSafe:false},{position:'01',coins:[],isSafe:false},
		{position:'02',coins:[],isSafe:true},{position:'03',coins:[],isSafe:false},
		{position:'04',coins:[],isSafe:false},{position:'10',coins:[],isSafe:false},
		{position:'11',coins:[],isSafe:false},{position:'12',coins:[],isSafe:false},
		{position:'13',coins:[],isSafe:false},{position:'14',coins:[],isSafe:false},
		{position:'20',coins:[],isSafe:true},{position:'21',coins:[],isSafe:false},
		{position:'22',coins:[],isSafe:true},{position:'23',coins:[],isSafe:false},
		{position:'24',coins:[],isSafe:true},{position:'30',coins:[],isSafe:false},
		{position:'31',coins:[],isSafe:false},{position:'32',coins:[],isSafe:false},
		{position:'33',coins:[],isSafe:false},{position:'34',coins:[],isSafe:false},
		{position:'40',coins:[],isSafe:false},{position:'41',coins:[],isSafe:false},
		{position:'42',coins:[],isSafe:true},{position:'43',coins:[],isSafe:false},
		{position:'44',coins:[],isSafe:false}
	];
	this.playersPath = {
		'green':['02','01','00','10','20','30','40','41','42','43','44','34','24','14','04','03','13','23','33','32','31','21','11','12','22'],
		'yellow':['42','43','44','34','24','14','04','03','02','01','00','10','20','30','40','41','31','21','11','12','13','23','33','32','22']
	};
	// this.safePositions = ['13','31','35','53','33'];
};

Board.prototype = {
	findTileIndexOfCoin: function(coin){
		var path = this.playersPath[coin.color];
		return (coin.position)? path.indexOf(coin.position) : null;
	},
	findNextPosition: function(coin,diceValue){
		var path = this.playersPath[coin.color];
		var currentIndex = this.findTileIndexOfCoin(coin);
		console.log("The current index is ",currentIndex);
		if(!isValidMove(currentIndex,diceValue))
			return null;
		return currentIndex? path[currentIndex + diceValue] : path[0];
	}
}

var isValidMove = function(currentIndex,diceValue){
	if(currentIndex && currentIndex+diceValue<25)
		return true;
	if(!currentIndex && diceValue==6)
		return true;
	return false;
};

module.exports = Board;
