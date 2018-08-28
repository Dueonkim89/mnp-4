const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const public = path.join(__dirname + '/../public');
const PORT = process.env.PORT || 3000;
const app = express();

const {generateMessage, generateLocationMessage} = require('./message');
const { isRealString } = require('./validation');

var server = http.createServer(app);
var io = socketIO(server);


app.use(express.static(public));

io.on('connection', socket => {
	console.log('New user connected');

	socket.on('disconnect', () => {
		console.log('User was disconnected');
	});	


	
	socket.on('join', (params, callback) => {
		if (!isRealString(params.name) || !isRealString(params.room)) {
			callback('Name and room name are required');
		}
		socket.join(params.room);
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App!'));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));		
		callback();
	});
	
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


