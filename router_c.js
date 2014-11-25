var app = require('express')(); //get express model
var http = require('http').Server(app); //create a http server
var io = require('socket.io')(http); //create socket.io
var router_name = 'c'; //to store login router_name
var DV = {};
var c_DV={'d':{"sID": router_name,
			"dID": 'd',
			"dP": '5834',
			"nH": 1,
			"dis": 3,
			"nR": 'd'}};
var a_port=2547;
var router=new Array;
var name;
var port;
var dgram = require('dgram'); // UDP需要引入该模块
var server = dgram.createSocket('udp4'); // ipv4
var server1 = dgram.createSocket('udp4');
var client=dgram.createSocket('udp4');

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
	socket.on('change',function(msg){
          console.log('change');
          msg = 'which router cost you want to change ?';
          io.emit('change_what',msg);
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
	socket.on('kill',function(msg){
         var msg='router'+' '+router_name+' '+"is killed";
         io.emit('message',msg);
         process.exit(0);
	});
	socket.on('change_routers',function(msg){
		name=msg;
		console.log('change routers');
		var msg='Ok,  port number ?';
		io.emit('add_port',msg);

	})
	socket.on('port', function(msg) {
		console.log('add port');
		port=msg;
		var msg="How many cost ?"
		io.emit('add_cost', msg);

	});
	socket.on('cost',function(msg){
        console.log('add cost');
        router[name][port]=msg;
        
        DV[name]={"sID":router_name,"dID":name,"dP":port,"nH":1,"dis":msg,"nR":name};
       /* DV.name.sID='a';
        DV.name.dID=name;
        DV.name.dP=port;
        DV.name.nH=1;
        DV.name.dis=msg;
        DV.name.nR=name;*/
        var msg=name+" "+"is set";
        console.log(router[name][port]);
        console.log(DV);
        io.emit('message',msg);
	});
	
	
});

var s=JSON.stringify(c_DV);
console.log(s);
var copy=new Buffer(s);

var s1=JSON.parse(s);
console.log(s1);
client.send(copy,0,copy.length,a_port,'127.0.0.1',function(err,bytes){
	if(err){
		throw err;
	}
	client.close();
})

http.listen(8083, function() { //The router will listen commands from port 2547
	console.log('Routers starts on 8082');


});



