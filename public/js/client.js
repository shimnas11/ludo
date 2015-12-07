var getUpdation = function(){
    var name = document.querySelector("#name").value;
    var req = new XMLHttpRequest();
    req.onreadystatechange = function(){
        if(req.readyState==4 && req.status==200){
            var response = req.responseText;
            document.write(response);
        }
    }
    req.open('POST','start',true)
    req.send();
        //'name='+name+'&id='+document.cookie
});