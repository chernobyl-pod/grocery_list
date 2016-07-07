'use strict';

var socket = io();
var items = document.getElementById('socketMessages');
socket.on('new item', function(data) {
    console.log("data:", data);
    var h3 = document.createElement('h3');
      h3.innerHTML = data.name;
    items.appendChild(h3);
    //socket.emit('here', {my: 'data'});
});

//
