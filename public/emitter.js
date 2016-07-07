'use strict';


var socket = io();

var sockbutt = document.getElementById("socketButton");
var itemName = document.getElementById('item_name');
var itemQTY = document.getElementById('item_qty');

sockbutt.addEventListener('click', function(e) {
    // e.preventDefault();
    // e.stopPropagation();
    var item = {
      name: itemName.value,
      qty: itemQTY.value
    }
    console.log("message: ", itemName.value);
    console.log("vals: ", itemQTY.value);
    socket.emit('new item', item);
    socket.on('new item', function(newItem) {
      console.log("newItem", newItem);
    });
    ///var path = window.location.pathname;
    console.log("We are inside");
    // ajax('POST', "/addnewitem/addnew", item, function(data) {
    //     console.log("request sent: ", data);
    //     // window.location.assign(path.substring(0, path.indexOf('/messages')));
    // });
    // return false;
});



function ajax(method, route, data, callback) {
    var req = new XMLHttpRequest();
    req.onload = function() {
        console.log("THIS: ", this);
        console.log("req.status: ", this.status);
        console.log("this.responseText: ", this.responseText);
        return callback(JSON.parse(this.responseText));
    }
    req.open(method, route);
    if (method === 'POST') {
        req.setRequestHeader('Content-Type', 'application/json');
        req.setRequestHeader('Accept', 'application/json');
        req.send(JSON.stringify(data));
    }
}
