'use strict';

var socket = io();
var items = document.getElementById('socketMessages');
socket.on('new item', function(data) {
    console.log("data:", data);
    var h1 = document.createElement('h3');
      h1.innerHTML = data.name;
    items.appendChild(h1);
    //socket.emit('here', {my: 'data'});
});

//
