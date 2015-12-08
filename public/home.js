var players = {player1:{},player2:{}};
var move = function(coin,clas){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status==200){
            var response = req.responseText;
            if(Object.keys(response).length!=0){
                players=JSON.parse(response);
                movePlayers(players);
            }
        }
    }
    if(players.player1[coin.id]==undefined){
        players.player1[coin.id]={};
        players.player1[coin.id].position=00;
    }
     if(players.player2[coin.id]==undefined){
        players.player2[coin.id]={};
        players.player2[coin.id].position=01;
    }
    req.open('POST','movement',true);
    req.send('coinId='+coin.id+'&coinClass='+coin.className+'&clas='+
    clas+'&position='+players[coin.className][coin.id].position);
};

var getUpdation = function(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status==200){
            var response = req.responseText;
            if(Object.keys(response).length!=0)
                movePlayers(JSON.parse(response));  
        }
    };
    req.open('POST','refresh',true);
    req.send();
};



var movePlayers=function(players){
    var player1Coins=Object.keys(players.player1);
    var player2Coins=Object.keys(players.player2);
    if(player1Coins.length>0)
        player1Coins.map(movePlayer1);
    if(player2Coins.length>0)
        player2Coins.map(movePlayer2);
}

var movePlayer1=function(keys){
     if(players.player1[keys].position==00){
            $('.green').append(document.querySelector(".board .player1[id='"+keys+"']"));
        return;
    }
    var coin = document.querySelector(".green [id='"+keys+"']");
    if(coin==null){
        document.querySelector(".board [id='"+players.player1[keys].position+"']").appendChild
       (document.querySelector(".board .player1[id='"+keys+"']"));
    }
    else{
        var x = document.querySelector(".board [id='"+players.player1[keys].position+"']")
        if(x==null)
            return;
        x.appendChild(coin);
    }
}

var movePlayer2=function(keys){
    if(players.player2[keys].position==01){
            $('.yellow').append(document.querySelector(".board .player2[id='"+keys+"']"));
        return;
    }
    var coin = document.querySelector(".yellow [id='"+keys+"']");
    if(coin==null)
        document.querySelector(".board [id='"+players.player2[keys].position+"']").appendChild
       (document.querySelector(".board .player2[id='"+keys+"']"));
    else{
        var x = document.querySelector(".board [id='"+players.player2[keys].position+"']");
        if(x==null)
            return;
        x.appendChild(coin);
    }
}

var rollDice = function(){
    $.get('rollDice', function(data){
        var diceValue = JSON.parse(data);
        console.log(data);
    $('.dice').html('<img src="./images/d'+(+diceValue)+'.gif" onclick="rollDice()">')
        });
}
   

// window.onload = function (){
//     // setInterval(getUpdation,1000);
// };