var app = require('express')(); //get express model
var http = require('http').Server(app); //create a http server
var io = require('socket.io')(http); //create socket.io
var user_name = 'no user'; //to store login user_name
var DV = '{"sID":A,"dID":B,"des":0,"nh":0,"NID":0}';
var router=new Array;
var name;
var port;
var dgram = require('dgram'); // UDP需要引入该模块
var server = dgram.createSocket('udp4'); // ipv4
var server1 = dgram.createSocket('udp4');

app.get('/', function(req, res) { //link the js to html file
	res.sendfile('index.html');

});
function findrouters(name){
	for(var i=0;i<=router.length;i++){
		if(router[i]==name){
			return true;
		}
		else{
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
	socket.on('routers', function(msg) {
		console.log('chose router');
		if (!findrouters(msg)) {
			name=msg;
			router[msg]=new Array;
			console.log(router);
		var	msg = 'Ok, port number?';
			io.emit('add_port', msg);
		}
		else{
			var msg='There has been a same router';
			io.emit('message',msg);
		}

	});
	socket.on('port', function(msg) {
		console.log('add port');
		port=msg;
		router[name][msg]=new Array;
		var msg="How many cost ?"
		io.emit('add_cost', msg);

	});
	socket.on('cost',function(msg){
        console.log('add cost');
        router[name][port]=msg;
        var msg=name+" "+"is set";
        console.log(router[name][port]);
        io.emit('message',msg);
	})
});



http.listen(8081, function() { //The router will listen commands from port 2547
	console.log('Routers starts on 8081');


});



