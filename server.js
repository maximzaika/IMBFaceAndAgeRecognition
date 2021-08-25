/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.
           Server Side File, which needs to be executed with "node server.js" command

           The following file is the Server side file.
           It assigns what files can be used by the client. It gets triggered
           whenever the upload event happens on client's side. After that this
           file triggers the @class TimerObserver which notifies @class faceRecogntion
           and @class text2speech to be executed.

     @author Maxim Zaika (26437929); Sanjay Sekar Samuel (25036335);
     @requires express https://www.npmjs.com/package/express
     @requires path https://www.npmjs.com/package/path
     @requires http https://www.npmjs.com/package/http-https
     @requires socketio-file-upload https://www.npmjs.com/package/socketio-file-upload
     @requires TimerObserver ./observer.js
     @requires fs https://www.npmjs.com/package/fs
     @requires empty https://www.npmjs.com/package/empty */

const port = 3000;
var http = require('http');
var express = require('express');
var app = express();
var path = require('path');
var SocketIOFileUpload = require('socketio-file-upload');
var fs = require('fs');
var start_server = http.createServer(app).listen(port); // this line starts the server
var io = require('socket.io')(start_server);
const TimerObserver = require('./observer.js')
const empty = require('empty-folder');

app.get('/', function(req, res){res.sendFile(__dirname + '/Public/index.html'); }); //allows user to launch index.html
app.use(express.static(path.join(__dirname, '/Public'))); //allows user to access Public folder only
empty('./Public/images', false, (o)=>{console.log('[REMOVED] old images from ./Public/Images');});
empty('./Public/Audio', false, (o)=>{console.log('[REMOVED] old audio files from ./Public/Audio');});

console.log("[SERVER RUNNING AT] localhost:"+port);

/*** @function sockets.on
     @desc gets triggered by the client side whenever the new upload happens.
     @pre-condition upload event must take place
     @post-condition triggeres observer @class TimerObserver
     @return none (not intended to)*/
io.sockets.on("connection", function(socket){
  var observer = new TimerObserver(io,fs,socket,app);
  observer.updateClient;
});
