// Code for the demos in the YouTube video 'Introducing Socket.IO'
// Written by Mitchell Clarke, for Advanced Internet Programming at University of Technology, Sydney
// Socket.IO website: https://socket.io/

var app = require('express')();
var server = require('http').Server(app);
var io = require('socket.io')(server);

// --------------------------
// Socket.IO for DEMO.HTML
// --------------------------

// Listen for new client connections
io.on('connection', function (socket) {
	// Send a confirmation message to the client
	console.log('Client '+socket.id+' connected.');
	socket.emit('server_msg', { 'msg' : 'Connected to server!'});
	
	// Log messages the client sends to the server, and send confirmation back
	socket.on('client_msg', function (data) {
		console.log('Client '+socket.id+' message: '+data.msg);
		socket.emit('server_msg', { 'msg' : 'Server recieved your message: ' + data.msg});
	});
	
	// Log broadcasts the client sends to the server and send to all other connected clients
	socket.on('client_broadcast', function (data) {
		console.log('Client '+socket.id+' broadcast: '+data.msg);
		socket.broadcast.emit('server_msg', { 'msg' : 'Another client\'s broadcast: ' + data.msg});
		socket.emit('server_msg', { 'msg' : 'Server recieved your broadcast: ' + data.msg});
	});
	
	// Log when client disconnect
	socket.on('disconnect', function () {
		console.log('Client '+socket.id+' disconnected.');
	});
});

// --------------------------
// Socket.IO for COLOUR.HTML
// --------------------------

// Create a new Socket.IO namespace called '/colour'
var colour = io.of('/colour')
var groups = {}

// Listen for new client connections to the '/colour' namespace
colour.on('connection', function (socket) {
	// Send confirmation to the client and add their ID to the list of groups
	console.log('Client '+socket.id+' connected.');
	socket.emit('server_msg', { 'msg' : 'Connected to colour server!'});
	groups[socket.id] = ''
	
	// Listen for the 'blue' event, which assigns clients to the blue room
	socket.on('blue', function () {
		socket.leave('red')
		socket.join('blue')
		groups[socket.id] = 'blue'
		console.log('Client '+socket.id+' joined the blue room.');
	});
	
	// Listen for the 'red' event, which assigns clients to the red room
	socket.on('red', function () {
		socket.leave('blue')
		socket.join('red')
		groups[socket.id] = 'red'
		console.log('Client '+socket.id+' joined the red room.');
	});
	
	// When recieving a message, send it to all other clients 'in' the same coloured room
	socket.on('client_msg', function (data) {
		console.log('Client '+socket.id+' message, for '+groups[socket.id]+' clients: '+data.msg);
		colour.in(groups[socket.id]).emit('colour_msg', { 'msg' : 'Message for '+groups[socket.id]+' clients: ' + data.msg});
	});
	
	// On disconnection, stop tracking which group the ID belongs to
	socket.on('disconnect', function () {
		delete groups[socket.id]
		console.log('Client '+socket.id+' disconnected.');
	});
});

// Have the server send a random number to blue and red clients every second
function randomNumber() {
	x = Math.floor((Math.random() * 9) + 1);
	y = Math.floor((Math.random() * 9000) + 1000);
	colour.in('blue').emit('server_msg', { 'msg' : 'Small random number for blue: ' + x});
	colour.in('red').emit('server_msg', { 'msg' : 'Large random number for red: ' + y});
}
setInterval(randomNumber, 1000);

// --------------------------
// EXPRESS app code
// --------------------------

// Define the routes to the two demo HTML files
app.get('/demo', function (req, res) {
	res.sendFile(__dirname + '/demo.html');
});

app.get('/colour', function (req, res) {
	res.sendFile(__dirname + '/colour.html');
});

// Listening must be declared at SERVER level for Socket.IO
server.listen(4000, function () {
	console.log("Listening at http://localhost:4000")
});