var socket = io();

function scrollToBottom() {
	// Selectors
	const messages = $('#messages');
	const newMessage = messages.children('li:last-child');
	//Heights
	const clientHeight = messages.prop('clientHeight');
	const scrollTop = messages.prop('scrollTop');
	const scrollHeight = messages.prop('scrollHeight');
	const newMessageHeight = newMessage.innerHeight();
	const lastMessageHeight = newMessage.prev().innerHeight();
	
	
	if (clientHeight + scrollTop + lastMessageHeight + newMessageHeight  >= scrollHeight) {
		messages.scrollTop(scrollHeight);
	}
}


socket.on('connect', function() {
	var params = $.deparam(window.location.search);
	socket.emit('join', params, function(err) {
		if (err) {
			alert(err);
			window.location.href = '/';
		} else {
			console.log('No error');
		}
	});
});

const locationButton = $('#send-location');
var messageInput = $('[name=message]');

socket.on('createMessage', function(message) {
	console.log(message);
});	

socket.on('disconnect', function() {
	console.log('disconnecting..');
});	
	
socket.on('newMessage', function(message) {
	var formatTime = moment(message.createdAt).format('h:mm a');
	var template = $('#message-template').html();
	var html = Mustache.render(template, {
		text: message.text,
		from: message.from,
		createdAt: formatTime
	});
	
	$('#messages').append(html);
	scrollToBottom();
	/*
	console.log(message);	
	var li = $('<li></li>');
	li.text(`${message.from} ${formatTime}: ${message.text}`);	
	$('#messages').append(li);
	*/
});	

socket.on('newLocationMessage', function(message) {
	console.log(message);
	var formatTime = moment(message.createdAt).format('h:mm a');
	var template = $('#location-message-template').html();
	var html = Mustache.render(template, {
		url: message.url,
		from: message.from,
		createdAt: formatTime
	});
	$('#messages').append(html);
	locationButton.removeAttr('disabled').text('Send Location');	
	scrollToBottom();
	/*
	var li = $('<li></li>');
	var a = $('<a target="_blank">My current location</a>');	
	li.text(`${message.from} ${formatTime}: `);
	a.attr('href', message.url);
	li.append(a); */
});

$('#message-form').on('submit', function(event) {
	event.preventDefault();		
	socket.emit('createMessage', {
		from: 'User',
		text: messageInput.val()
	}, function() {
		messageInput.val('');
		messageInput.focus();
	});
});

locationButton.on('click', function() {
	if (!window.navigator.geolocation) {
		return alert('Gelocation not supported by your browser');
	}
	
	locationButton.attr('disabled', 'disabled').text('Finding Location');	
	window.navigator.geolocation.getCurrentPosition(function (position) {
		socket.emit('createLocationMessage', {
			latitude: position.coords.latitude,
			longitude: position.coords.longitude
		});
	}, function () {
		locationButton.removeAttr('disabled').text('Send Location');
		alert('Unable to fetch location');
	});
	
});















