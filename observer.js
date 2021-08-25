/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.

           The following file is the Server side file.
           It gets triggered whenever upload even takes place.

     @author Maxim Zaika (26437929); Sanjay Sekar Samuel (25036335);
     @requires socketio-file-upload https://www.npmjs.com/package/socketio-file-upload
     @requires ./Classes/faceRecognition.js
     @requires ./Classes/text2speech.js */

var SocketIOFileUpload = require('socketio-file-upload');
const faceRecognition = require('./Classes/faceRecognition.js'); // Access the face regognition class
const text2speech = require('./Classes/text2speech.js'); // Access the text to speech js class

/** @class TimerObserver
    @classdesc Gets triggered whenever the upload onthe website takes place
    @param {object} this.io
    @param {object} this.fs
    @param {object} this.socket
    @param {object} this.app
    @pre-condition upload on the website takes place
    @post-condition launches uploader, and triggeres other classes like @class
                    faceRecogntion and @class text2speech
    @return imageTextData, event.file.base */
class TimerObserver {
  constructor(io,fs,socket,app) {
    this.io = io;
    this.fs = fs;
    this.socket = socket;
    this.app = app;
  };

  /** @pre-condition upload must take place on the website
      @post-condition uploads the files, tells other classes the details about
                      the uploaded file, and what to do with it
      @return this.runClasses() */
  get updateClient() {
    return this.runClasses();
  };

  /** @pre-condition upload must take place on the website and triggered by @function updateClient();
      @post-condition uploads the files, tells other classes the details about
                      the uploaded file, and what to do with it
      @return this.runClasses() */
  runClasses() {
    var io = this.io;
    var fs = this.fs;
    var socket = this.socket;
    this.app.use(SocketIOFileUpload.router);

    console.log("[CONNECTION] user has connected");
    var uploader = new SocketIOFileUpload(); // create instance for upload
    uploader.dir = (__dirname + "/Public/Images"); //assigns where the uploaded files go
    uploader.listen(socket); //listens for the uploads (uploader event)

    /* whenever the upload happens inside the ./Public/Image, the uploaders gets triggered */
    uploader.on("saved", function(event) { //perform actions on uploaded file
      console.log("[UPLOAD] File '" + event.file.base + ".jpg" + "' has been successfully uploaded to .Public/Images");
      (async function () {
          var imageTextData = await new faceRecognition(fs, event.file.pathName).imageDataOutput();
          var execText2Speech = await new text2speech(event.file.base, fs, imageTextData[0]).text2speechOutput();
          console.log('[IBM_IMAGE OUTPUT]',imageTextData[0]);
          console.log('[IBM_AUDIO OUTPUT]',execText2Speech);
          io.sockets.emit('IBM_data', imageTextData[0], imageTextData[1], event.file.base);
      })();
    });

    uploader.on("error", function(event) { // handles any upload errors
        console.log("Error from uploader");
    });
  };
};

module.exports = TimerObserver;
