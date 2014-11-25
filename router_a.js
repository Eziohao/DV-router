var app = require('express')(); //get express model
var http = require('http').Server(app); //create a http server
var io = require('socket.io')(http); //create socket.io

var router_name = 'a'; //to store login router_name
var router_port=2547;
var b_port=3721;
var c_port=4568;
var DV = {};

var b_DV = {};
var c_DV = {};

var router = new Array;
var name;
var port;
var dgram = require('dgram'); // UDP需要引入该模块
var server = dgram.createSocket('udp4'); // ipv4
var serer1=dgram.createSocket('udp4');

app.get('/', function(req, res) { //link the js to html file
	res.sendfile('index.html');

});

function routing(b_DV, c_DV) {
	var temp = {};
	var temp1 = {};
	for (var item in DV) {
		for (var i in b_DV) {
			if (item == b_DV[i].sID) {
				console.log('find');
				temp[i] = {

					"sID": b_DV[i].sID,
					"dID": b_DV[i].dID,
					"dP": b_DV[i].dP,
					"nH": b_DV[i].nH,
					"dis": b_DV[i].dis,
					"nR": b_DV[i].nR

				};

			}
		}
	}
	for (var item in DV) {
		for (var i in c_DV) {
			if (item == c_DV[i].sID) {
				console.log('got');
				temp1[i] = {

					"sID": c_DV[i].sID,
					"dID": c_DV[i].dID,
					"dP": c_DV[i].dP,
					"nH": c_DV[i].nH,
					"dis": c_DV[i].dis,
					"nR": c_DV[i].nR

				};
			}
		}
	}
	for (var item in temp) {
		for (var i in temp1) {
			if (item == i) {
				console.log('haha');
				if (temp[item].dis + DV[temp[item].sID].dis >= DV[temp1[i].sID].dis + temp1[i].dis) {
					DV[i] = {
						"sID": router_name,
						"dID": temp1[i].dID,
						"dP": temp1[i].dP,
						"nH": temp1[i].nH + 1,
						"dis": temp1[i].dis + DV[temp1[i].sID].dis,
						"nR": i
					}
					console.log(DV);
				}
				else{
				   	DV[i] = {
						"sID": router_name,
						"dID": temp[item].dID,
						"dP": temp[item].dP,
						"nH": temp[item].nH + 1,
						"dis": temp[item].dis + DV[temp[item].sID].dis,
						"nR": temp[item].sID
					}
					console.log(DV);
				}
			}
		}
	}
    
};


function findrouters(name) {
	for (var i in router) {
		if (i == name) {
			return true;
		} else {
			return false;
		}
	}
}
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
			console.log(router);
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
			"sID": 'a',
			"dID": name,
			"dP": port,
			"nH": 1,
			"dis": msg,
			"nR": name
		};
	
		var msg = name + " " + "is set";
		console.log(router[name][port]);
		console.log(DV);
	
		io.emit('message', msg);
	});


});
server.on('listening',function(){
	console.log('udp started');
});
server.on('message',function(message){
    
})



server.bind(b_port,'127.0.0.1');
server1.bind(c_port,'127.0.0.1');


http.listen(8081, function() { //The router will listen commands from port 8081
	console.log('Routers starts on 8081');
});