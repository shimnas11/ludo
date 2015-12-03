var player = {};
var move = function(coin,clas){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status==200){
            var response = req.responseText;
            if(Object.keys(response).length!=0){
                updatePlayer(response);
            }
        }
    }
    player[coin.id] = coin;
    if(player[coin.id].position==undefined)
        player[coin.id].position = 13;
    req.open('POST','movement',true);
    req.send('coinId='+coin.id+'&coinClass='+coin.className+'&clas='+
        clas+'&position='+player[coin.id].position);
};

var getUpdation = function(){
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status==200){
            var response = req.responseText;
            if(Object.keys(response).length!=0)
                updatePlayer(response);  
        }
    };
    req.open('POST','refresh',true);
    req.send();
};

var updatePlayer = function(response){
    var res = JSON.parse(response);
    player[res.coinId].position = res.position;
    if(res.coinClass=="player1")
        movePlayer1(res);
    else
        movePlayer2(res);
};

var movePlayer1 = function(res){
    var coin = document.querySelector(".green [id='"+res.coinId+"']");
    if(coin==null){
        // killPlayer2(res);
         document.querySelector(".board [id='"+res.position+"']").appendChild
        (document.querySelector(".board .player1[id='"+res.coinId+"']"));
    }
    else
        document.querySelector(".board [id='"+res.position+"']").appendChild
         (coin);
};
var movePlayer2 = function(res){
    var coin = document.querySelector(".yellow [id='"+res.coinId+"']");
    if(coin==null)
         document.querySelector(".board [id='"+res.position+"']").appendChild
        (document.querySelector(".board .player2[id='"+res.coinId+"']"));
    else
        document.querySelector(".board [id='"+res.position+"']").appendChild
         (coin);
};

// var killPlayer2 =function(res){
//     var player2coin=document.querySelector(".board [id='"+res.position+"''] .player2");
//     if(player2coin==null)
//         return;
//     document.querySelector(".yellow [id='"+player2coin.id+"']").appendChild(player2coin);
// }    

// window.onload = function (){

// };
