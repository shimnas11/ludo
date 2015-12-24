var http = require('http');
var controller = require('./library/controller.js');

http.createServer(controller).listen(8080);
