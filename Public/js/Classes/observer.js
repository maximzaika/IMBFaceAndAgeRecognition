/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.

           The following file is the Clien side file.
           It gets triggered by the @class clientListen or upload event.

     @author Maxim Zaika (26437929); Sanjay Sekar Samuel (25036335);
     @requires socket.io https://www.npmjs.com/package/socket.io
     @requires socketio-file-upload https://www.npmjs.com/package/socketio-file-upload */

var socket = io.connect();
var siofu = new SocketIOFileUpload(socket); //uses siofu to upload files to the server
var audioCounter = 0;
var audioFilePath = "";
var imageFilePath = "";

/** @class TimerObserver
    @classdesc receives the upload notification from the client, push the file to
               the server, and updates the server by telling it to perform actions
               on received file
    @param {object} this.siofu
    @param {object} this.document
    @pre-condition upload from the client has taken place, or play audio has been clicked
    @post-condition tells the server to start the work on uploaded file, triggers
                    @class updateWebsite to show the image or execute the audio
    @return none */
class TimerObserver {
  constructor(siofu,document) {
    this.siofu = siofu;
    this.document = document;
  }

  /** @pre-condition gets triggered whenever upload event happens on the website
      @post-condition uploads user's image from the browser to the server
      @return this.updateServer() */
  get runServer() {
    return this.updateServer();
  }

  /** @pre-condition gets triggered whenever upload event happens on the website
                     and @function runServer() is executed
      @post-condition uploads user's image from the browser to the server. Triggeres
                      @class updateWebsite to notify about the successful upload
      @return none */
  updateServer() {
    var siofu = this.siofu;
    var document = this.document;
    document.addEventListener("DOMContentLoaded", function(){
        //listen for the upload click or listen for the drag and drop
        siofu.listenOnInput(document.getElementById("upload_input"));
        siofu.listenOnDrop(document.getElementById("drop-area"));

        // notify user that file has been uploaded
        siofu.addEventListener("complete", function(event){
          new updateWebsite().updateWebsiteAlert();
        });
    }, false);
  }

  /** @pre-condition triggered by @class clientListen. Basicall IBM pushed the data
                     to our website
      @param {array} imageData
      @param {string} fileName
      @post-condition triggers @class updateWebsite to enable the visual animation on the website
                         and pushes the received data from the server to the website
      @return none */
  updateClientImageData(imageData,faceLocation,fileName) {
    new updateWebsite().enableOutput("imageAnalysis-area");
    $('#personData').text(imageData); //updates person's data on a website
    audioFilePath = "./Audio/"+fileName+".wav"; // the global location of the audio file
    imageFilePath = "./Images/"+fileName+".jpg"; // the location of the image file
    //displayImages(imageFilePath, faceLocation); goes here
    new updateWebsite().displayImage(imageFilePath, faceLocation);
  };

  /** @pre-condition triggered by @class clientListen. User clicked the play audio button
      @post-condition triggers @class updateWebsite to play/stop the audio on the website
      @param {string} audioFilePath
      @return none */
  updateClientRunAudio(audioFilePath) {
    new updateWebsite().playStopAudio(audioFilePath, audioCounter);
    audioCounter++;
  };
}
