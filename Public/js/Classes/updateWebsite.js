/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.

           The following file is the Clien side file.
           Gets triggered by @class TimerObserver whenever the file gets uploaded to
           the website or play audio button is clicked

     @author Sanjay Sekar Samuel (25036335); Maxim Zaika (26437929);   */

/** @class TimerObserver
   @classdesc gets triggered by @class TimerObserver whenever the file gets uploaded to
              the website or play audio button is clicked
   @pre-condition upload from the client has taken place, or play audio has been clicked
   @post-condition notifies the user of a successful upload, performs animation,
                   plays audio
   @return none */
class updateWebsite {
  /** @pre-condition image is uplaoded, data from IBM about the image is received, and
                     audio file as well
      @post-condition whenver the server pushes the data about the image, another window
                in the browser appears, the code below is responsible for activating
                window
      @param {string} divName
      @return none : instead performs action on the website */
  enableOutput(divName) { //imageAnalysis-area
    var imageAnalysis = document.getElementById(divName);
    if (imageAnalysis.style.display === "none") {
        imageAnalysis.style.display = "block";
    };
  }

  /** @pre-condition audio file is located inside the server folder
                     ./Public/Audio and play/stop audio even has take place
      @post-condition switches the play button between play or stop
      @param {path} path
      @param {integer} audioCounter
      @return none : instead plays/pauses music on the website */
  playStopAudio(path,audioCounter) {
    var player = document.getElementById('audioPlayer');   // The global tag to access audio player from html
    if (audioCounter % 2 === 0) { // when need to play
      player.src = path; //shows the path to the audio
      player.load(); //loads the audio to the website's cache
      player.play(); //start player
    } else { // when need to pause
      player.pause(); //makes the player pause the music
    };
  }

  /** @pre-condition successful upload has taken place
      @post-condition sends an alert to the website to notify the user
      @return none : instead notify the user of a successful upload */
  updateWebsiteAlert() {
    alert("Upload has been completed successfully!");
  };

  /** @pre-condition the text & audio are received from the IBM server
      @post-condition pushes user's image to the website
      @param {string} path
      @return none : instead update the website with the User's image */
  displayOriginalImage(path) {
    return new Promise(resolve => {
      var image = document.getElementById('usersImage');
      image.src = path;
      image.onload = function() {
        resolve($('#imageData').text("Your Image"));
      };
    });
  };

  /** @pre-condition the text & audio are received from the IBM server, and
                     the data about face's location
      @post-condition draws the 2nd image in a canvas format and draws
                      the rectangular box around detected face
      @param {string} path
      @param {array} faceLocation
      @return none */
  async displayImage(path,faceLocation) {
    await new updateWebsite().displayOriginalImage(path);
    var tempCanvas = document.getElementById('myCanvas'); //for redrawing the image
    var tempContext = tempCanvas.getContext("2d"); //for redrawing the image

    var image = document.getElementById('usersImage'); //detects the image on the website
    var origImgWidth = image.naturalWidth; //gets the original size of the image
    var origImgHeight = image.naturalHeight; //gets the

    $('#canvasData').text("Detected Faces") //adds this line on top of the images
    tempContext.drawImage(image,0,0,220,300); // draws the image based on the image uploaded

    var widthDifference = (220 / origImgWidth); //gets the percentage width difference for sclaing
    var heightDifference = (300 / origImgHeight); //gets the percentage height difference for sclaing

    for (var i=0; i < faceLocation.length; i++) { //loops through all the faces
      var height = faceLocation[i]["height"] * heightDifference; //scales the height based on reduced height's percentage
      var width = faceLocation[i]["width"] * widthDifference; //scales the width based on reduced width's percentage
      var x = faceLocation[i]["left"] * widthDifference; //scales the x location (left) based on reduced width's percentage
      var y = faceLocation[i]["top"] * heightDifference; //scales the y location (top) based on reduced height's percentage
      var canvas = document.getElementById('myCanvas');
      var context = canvas.getContext('2d'); //the rectangle around the face
      context.beginPath();
      context.setLineDash([5, 2]);
      context.strokeStyle = "#ffffff";
      context.lineWidth = 3;
      context.rect(x, y, width, height);
      context.stroke();
    };
  };
}
