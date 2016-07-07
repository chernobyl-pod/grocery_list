'use strict';

var socket = io();
socket.on('connect', function(data) {
    console.log("data:", data);
    //socket.emit('here', {my: 'data'});
});
