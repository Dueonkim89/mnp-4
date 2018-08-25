var socket = io();
socket.on('connect', function() {
	console.log('connected to server');
		
	socket.emit('createMessage', {
		from: 'newUser@newuser.com',
		text: 'New User'
	});	
	
});

socket.on('join', function(message) {
	console.log(message);
});	

socket.on('disconnect', function() {
	console.log('disconnecting..');
});	
	
socket.on('newMessage', function(email) {
	console.log(email);
});	