const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const public = path.join(__dirname + '/../public');
const PORT = process.env.PORT || 3000;
const app = express();

const {generateMessage, generateLocationMessage} = require('./message');

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(public));

io.on('connection', socket => {
	console.log('New user connected');

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});	

	socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App!'));

	socket.broadcast.emit('newMessage', generateMessage('Admin', 'New user has joined.'));
	
	socket.on('createMessage', (message, callback) => {
		console.log(message);
		io.emit('newMessage', generateMessage(message.from, message.text));	
		callback();
	});	

	socket.on('createLocationMessage', coords => {
		io.emit('newLocationMessage', generateLocationMessage('Admin', coords.latitude, coords.longitude));
	});	
});



server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});


