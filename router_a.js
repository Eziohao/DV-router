var app = require('express')(); //get express model
var http = require('http').Server(app); //create a http server
var io = require('socket.io')(http); //create socket.io
var route = require('./routing.js')
var router_name = 'a'; //to store login router_name
var router_port = 2547;
var DV = {};

var router = new Array;
var name;
var port;
var dgram = require('dgram'); // UDP module
var server = dgram.createSocket('udp4'); // ipv4
var client = dgram.createSocket('udp4');

app.get('/', function(req, res) { //link the js to html file
	res.sendfile('index.html');

});




function findrouters(name) {
	for (var i in router) {
		if (i == name) {
			return true;
		} else {
			return false;
		}
	}
};



io.on('connection', function(socket) { //if a user coonect the server
	console.log('connect to the control');
	socket.on('add', function(msg) {
		console.log('add');
		msg = 'which router cost you want to add ?'
		io.emit('add_what', msg);
	});
	socket.on('change', function(msg) {
		console.log('change');
		msg = 'which router cost you want to change ?';
		io.emit('change_what', msg);
	});
	socket.on('routers', function(msg) {
		console.log('chose router');
		if (!findrouters(msg)) {
			name = msg;
			router[msg] = new Array;

			var msg = 'Ok, port number?';
			io.emit('add_port', msg);
		} else {
			var msg = 'There has been a same router';
			io.emit('message', msg);
		}

	});
	socket.on('kill', function(msg) {
		var msg = 'router' + ' ' + router_name + ' ' + "is killed";
		io.emit('message', msg);
		process.exit(0);
	});
	socket.on('change_routers', function(msg) {
		name = msg;
		console.log('change routers');
		var msg = 'Ok,  port number ?';
		io.emit('add_port', msg);

	})
	socket.on('port', function(msg) {
		console.log('add port');
		port = msg;
		var msg = "How many cost ?"
		io.emit('add_cost', msg);

	});
	socket.on('cost', function(msg) {
		console.log('add cost');
		router[name][port] = msg;

		DV[name] = {
			"sID": router_name,
			"dID": name,
			"dP": port,
			"nH": 1,
			"dis": msg,
			"nR": name,
			"sP": router_port
		};

		var msg = name + " " + "is set";
		console.log(router[name][port]);
		console.log(DV);

		io.emit('message', msg);
	});
	socket.on('display', function(msg) {
		console.log('display');
		msg = JSON.stringify(DV);
		io.emit('display on', msg);
	})

});
server.on('listening', function() {
	console.log('udp started');
});
server.on('message', function(message, rinfo) {
	var s_DV = {};
	s_DV = JSON.parse(message);

	DV = route.routing(DV, s_DV, router_name, router_port);
	console.log(DV);

})
setInterval(function() {
	if (!route.isEmpty(DV)) {
		s = JSON.stringify(DV);
		var copy = new Buffer(s);
		for (item in DV) {
			if (DV[item].dID == DV[item].nR) {
				client.send(copy, 0, copy.length, DV[item].dP, '127.0.0.1', function(err, bytes) {
					if (err) {
						throw err;
					}

				})
			}
		}
	}
}, 10000);



server.bind(router_port, '127.0.0.1');


http.listen(8081, function() { //The router will listen commands from port 8081
	console.log('Routers starts on 8081');
});