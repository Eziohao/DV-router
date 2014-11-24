var PORT1 = 8888;
var HOST = '127.0.0.1';

var dgram = require('dgram');
var json = '{"result":true,"count":1}',
    obj = JSON.parse(json);


//var msg=new Buffer(JSON.parse(message));


var json1 = JSON.stringify(json);

console.log(json1);
// '[116,101,115,116]'

var copy = new Buffer(json1);

console.log(copy);

var message1=new Buffer('hhhhhh');
var client = dgram.createSocket('udp4'); // ipv4
var client1=dgram.createSocket('udp4');
client.send(copy, 0, copy.length, PORT1, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ PORT1);
    client.close();
});
client1.send(message1, 0, message1.length, 8080, HOST, function(err, bytes) {
    if (err) throw err;
    console.log('UDP message sent to ' + HOST +':'+ 8080);
    client1.close();
});