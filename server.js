//server.js

//Modules

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var mongoose = require('mongoose');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var session      = require('express-session');

var passport     = require('passport');


//configuration

var db = require('./config/db');

//set our port

var port = (process.env.PORT || 8080);

//connect our MongoDB database
mongoose.connect(db.uri);


// log every request to the console
app.use(morgan('dev')); 

// read cookies (needed for auth)
app.use(cookieParser());

//get data and all the parameters from request
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 

// override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(methodOverride('X-HTTP-Method-Override')); 

// set the static files location /public/img will be /img for users
app.use(express.static(__dirname + '/public')); 

// required for passport
app.use(session({ secret: 'secretymcsecretysauce' })); // session secret
app.use(flash()); // use connect-flash for flash messages stored in session

// routes
require('./app/routes')(app, passport); // configure our routes
require('./config/passport')(passport); //configure authentication strategies.

app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions



// start app ===============================================
// startup our app at http://localhost:8080
app.listen(port);               

// shoutout to the user                     
console.log('Magic happens on port ' + port);

// expose app           
exports = module.exports = app;                         

