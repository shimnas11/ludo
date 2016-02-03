var express = require('express');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var app = express();

app.use(express.static('./public'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
	res.redirect('./login.html');
});

app.post('/login',function(req,res){
	req.header.cookie = req.body.name;
	res.redirect('./joinPage.html');
});

module.exports = app;
