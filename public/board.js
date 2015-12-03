
var ale=function(self){
	alert(self.id);
};

var printGrid=function(clas){
	var a = [];
	for(var j=1;j<6;j++){
		for(var i = 1 ; i <6 ; i++){	
			a.push("<td width=100px height=90px id="+j+i+"></td>");
		}
		a.push('</tr><tr>');
	};
	a.splice(0,0,"<table border='1' class="+clas+">");
	a.push('</table>')
	a = a.join("\n");
	return a;

};

document.write(printGrid('board'));

var addSafeHouse=function(clas,id){
	document.querySelector(".board [id='"+id+"']").style.backgroundColor="#000000";
};

var safeHouse=[13,31,35,53];
safeHouse.forEach(function(id){
	addSafeHouse('board',id)
});

