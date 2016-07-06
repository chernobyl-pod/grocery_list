'use strict';

var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var cookieSession = require('cookie-session');
var knex = require('knex');
var url = require('url');
require('dotenv').config();
var http = require('http').Server(express);
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


var app=express();
var router = express.Router();

app.use(cookieSession({
  name: 'session',
  keys: [process.env.KEY_ONE]
}));

app.set('view engine', 'ejs');
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));

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

var port = process.env.PORT || 3000;

app.listen(port, function() {
  console.log("Listening on: " + port + ".");
});


http.listen(3005, function(){
  console.log("socket listen on 3005");
});

io.on('connection', function (socket) {
  // console.log("socket connected" + socket.id);
  // socket.emit('news', { hello: 'world' });
  //console.log(socket);
  socket.on('here', function (data) {
    //console.log(data);
  });
  socket.on('disconnect', function () {
    console.log("disconnect");
  });
});
