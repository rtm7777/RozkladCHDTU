define(['jquery'
],function($) {
	var socket;
	$.ajax({
		url: "/get_ws_token",
		async: false,
	}).done(function(data, status, xhr) {
		var token = xhr.getResponseHeader('Web-Socket-Token');
		socket =  new WebSocket('ws://'+window.location.host+'/ws/socket?token=' + token);
	});

	return socket;
});