'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var knex = require('knex');
var url = require('url');
require('dotenv').config();
var app=express();
var http = require('http').Server(app);
var bcrypt = require('bcrypt');

var io = require('socket.io')(http);


var login = require('./routes/login');
var register = require('./routes/register');
var home = require('./routes/index');
var logout = require('./routes/logout');
var households = require('./routes/households');
var addhousehold = require('./routes/addhousehold');
var leave = require('./routes/leavehousehold');
var newhousehold = require('./routes/newhousehold');
var recipes = require('./routes/recipes');
var addnewitem = require('./routes/addnewitem');
var recipequery = require('./routes/recipe-query');
var remove = require('./routes/remove');
var addnewrecipe = require('./routes/addnewrecipe');
var editrecipe = require('./routes/editrecipe');


var router = express.Router();

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY_ONE]
}));

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));

app.use('/', home);
app.use('/login', login);
app.use('/register', register);
app.use('/logout', logout);
app.use('/households', households);
app.use('/addhousehold', addhousehold);
app.use('/leave', leave);
app.use('/newhousehold', newhousehold);
app.use('/recipes', recipes);
app.use('/addnewitem', addnewitem);
app.use('/recipe-query', recipequery);
app.use('/delete', remove);
app.use('/addnewrecipe', addnewrecipe);
app.use('/editrecipe', editrecipe);

var port = process.env.PORT || 3000;
//
// app.listen(port, function() {
//   console.log("Listening on: " + port + ".");
// });

http.listen(port, function(){
  console.log("socket listen on " + port + "...");
});

io.on('connection', function (socket) {
  // console.log("socket connected" + socket.id);
  // socket.emit('news', { hello: 'world' });
  //console.log(socket);
  console.log('socked');
  socket.on('new item', function (item) {
    console.log(item);
    io.emit('new item', item);
  });

});

function hashPassword(pass) {
  bcrypt.genSalt(10, function(err, salt) {
    bcrypt.hash(pass, salt, function(err, hash) {
      console.log(hash);
    });
  });
}

console.log(hashPassword('1234'));
console.log(hashPassword('1234'));
console.log(hashPassword('1234'));
console.log(hashPassword('1234'));
console.log(hashPassword('1234'));
