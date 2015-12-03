var http = require('http');
var EventEmitter = require('events').EventEmitter;
var routes = require('./routes.js');
var get_handlers = routes.get_handlers;
var post_handlers = routes.post_handlers;
var rEmitter = new EventEmitter();

var matchHandler = function(url){
	return function(ph){
		return url.match(new RegExp(ph.path));
	};
};

rEmitter.on('next', function(handlers, req, res, next){
	if(handlers.length == 0) return;
	var ph = handlers.shift();
	ph.handler(req, res, next);
});

var handle_all_post = function(req, res){
	var handlers = post_handlers.filter(matchHandler(req.url));
	var next = function(){
		rEmitter.emit('next', handlers, req, res, next);
	};
	next();
}; 

var handle_all_get = function(req, res){
	var handlers = get_handlers.filter(matchHandler(req.url));
	var next = function(){
		rEmitter.emit('next', handlers, req, res, next);
	};
	next();
};

var requestHandler = function(req, res) {
	if (req.method == 'GET') {
		handle_all_get(req,res)
	};
    if(req.method == "POST"){
    	handle_all_post(req,res);
    }
};

http.createServer(requestHandler).listen(8080);

console.log('Server running on port 8080');