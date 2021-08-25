/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.

           The following file is the Clien side file.
           It gets triggered by the click of a play audio button or by
           receiving the data from the server.

     @author Maxim Zaika (26437929); Sanjay Sekar Samuel (25036335);  */

/** @class faceRecognition
    @classdesc gets triggered by the click of a play audio button or by
    receiving the data from the server.
    @param {object} this.socket
    @pre-condition gets triggered when data is received from the server or play audio
                   button is clicked
    @post-condition notifies the observer that data has been received from the server
                    or user has clicked the play audio button
    @return this.notifyObserver() */
class clientListen {
  constructor(socket) {
    this.socket = socket;
  }

  /** @pre-condition gets triggered whenever the play audio is clicked or data
                     received from the server
      @post-condition execute @function this.notifyObserver()
      @return this.notifyObserver() */
  get listen() {
    return this.notifyObserver();
  };

  /** @pre-condition data from server received or play audio button clicked
      @post-condition notifies the observer that data has been received from the server
                      or user has clicked the play audio button
      @return none */
  notifyObserver() {
    this.socket.on('IBM_data', function(imageData, faceLocation, fileName) {
      new TimerObserver().updateClientImageData(imageData,faceLocation,fileName);
    });

    $('#playStopAudio').on('click', function() {
      new TimerObserver().updateClientRunAudio(audioFilePath);
    });
  }
}
