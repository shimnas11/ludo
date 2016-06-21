var http = require('http');
var controller = require('./library/controller.js');
var server = http.createServer(controller);
server.listen(process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 8080, process.env.OPENSHIFT_NODEJS_IP);

server.on('error', function(argument) {
	console.log('Can not start server with the following args: '+
		argument);
});
