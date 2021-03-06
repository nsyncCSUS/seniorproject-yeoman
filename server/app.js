/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');
var cloudinary = require('cloudinary');
var multipart = require('connect-multiparty');



// Cloudary config (Image uplod )

cloudinary.config({
  cloud_name: 'dh6yzadp7',
  api_key: '129624214939534',
  api_secret: 'DfjThuKRtTyQ8FUFXik1N1jxPUI'
});


// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

var app = express();

app.use(multipart({
    uploadDir: './server/temppic/'
}));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static('./client'));
app.use(express.static('./client/assets'));

// Setup server
var server = require('http').createServer(app);
var socketio = require('socket.io')(server, {
  serveClient: config.env !== 'production',
  path: '/socket.io-client'
});
require('./config/socketio')(socketio);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;
