var socket = io();
socket.on('connect', function() {
	console.log('connected to server');
	
/*socket.emit('createMessage', {
		from: 'newUser@newuser.com',
		text: 'New User'
	}, function(message) {
		console.log(message);
	});	*/	
});

socket.on('createMessage', function(message) {
	console.log(message);
});	

socket.on('disconnect', function() {
	console.log('disconnecting..');
});	
	
socket.on('newMessage', function(message) {
	console.log(message);
	var li = $('<li></li>');
	li.text(`${message.from}: ${message.text}`);	
	$('#messages').append(li);
});	

$('#message-form').on('submit', function(event) {
	event.preventDefault();
	socket.emit('createMessage', {
		from: 'User',
		text: $('[name=message]').val()
	}, function() {
		
	});
});

