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

socket.on('newLocationMessage', function(message) {
	console.log(message);
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');	
	li.text(`${message.from}: `);
	a.attr('href', message.url);
	li.append(a);
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

const locationButton = $('#send-location');

locationButton.on('click', function() {
	if (!window.navigator.geolocation) {
		return alert('Gelocation not supported by your browser');
	}

	window.navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
		console.log(position);
	}, function () {
		alert('Unable to fetch location');
	});
	
});















