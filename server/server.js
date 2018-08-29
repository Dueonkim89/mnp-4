const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const public = path.join(__dirname + '/../public');
const PORT = process.env.PORT || 3000;
const app = express();

const {generateMessage, generateLocationMessage} = require('./message');
const { isRealString } = require('./validation');
const { Users } = require('./users');

var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();

app.use(express.static(public));

io.on('connection', socket => {
	console.log(socket.id);
	
	socket.on('disconnect', () => {
		var user = users.removeUser(socket.id);
		
		if (user) {
			io.to(user.room).emit('updateUserList', users.getUserList(user.room));
			io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left.`));
		}
	});	

	socket.on('join', (params, callback) => {	
		if (!isRealString(params.name) || !isRealString(params.room)) {
			return callback('Name and room name are required');
		}
		socket.join(params.room);
		
		users.removeUser(socket.id);
		users.addUser(socket.id, params.name, params.room);
		
		io.to(params.room).emit('updateUserList', users.getUserList(params.room));
			
		socket.emit('newMessage', generateMessage('Admin', 'Welcome to the chat App!'));

		socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined.`));		
		callback();
	});
	
	socket.on('createMessage', (message, callback) => {
		var user = users.getUser(socket.id);
		
		if (user && isRealString(message.text)) {
			io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));	
		}				
		callback();
	});	

	socket.on('createLocationMessage', coords => {
		var user = users.getUser(socket.id);
		
		io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
	});	
	
});



server.listen(PORT, () => {
	console.log(`Listening on port ${PORT}`);
});


