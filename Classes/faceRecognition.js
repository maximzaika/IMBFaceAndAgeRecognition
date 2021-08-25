/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.

           The following file is the Server side file.
           It gets triggered by the @class TimerObserver.

     @author Maxim Zaika (26437929); Sanjay Sekar Samuel (25036335);
     @requires watson https://www.npmjs.com/package/watson-developer-cloud */

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  api_key: '9ca76a82a25d680f710c20ee1281803bb799faac'
});

/** @class faceRecognition
    @classdesc Gets triggered whenever the server requests the IBM Visual Recognizer to
               recognize the faces on the image. Image gets uploaded to IBM Clouds,
               where IMB's identifies:
                 1. total number of faces on the image
                 2. detects the gender of each face on the image
                 3. returns minimum and maximun age of each face

               The code below:
                 1. receives total number of faces on the image
                 2. receives the gender of each face
                 3. gets the average with the following forumala: (max + min) / 2
                 4. combines Steps 1, 2, and 3 into 1 text and sends to the server
    @param {object} this.fs
    @param {string} this.filePath
    @pre-condition @class TimerObserver receives the clicked_stock from the @class click
    @post-condition accesses clients like StockQuoteWS or StockQuoteTimeLapseService
                    (or any other). Retrieves fieldNames, symbols, and quotes.
    @return this.imbImageProcessedData() : textOutput */
class faceRecognition {
  constructor (fs, imageLocation) {
    this.fs = fs;
    this.filePath = imageLocation;
  };

  /** @pre-condition must be triggered by @class TimerObserver
      @post-condition executes the code to process the image
      @return await this.imbImageProcessedData() */
  async imageDataOutput() {
    return await this.imbImageProcessedData();
  };

  /** @pre-condition image is uploaded to the server, and called be @function imageDataOutput();
      @post-condition pushes the file from our server to IBM server, and receives
                      information related to the image
      @return resolve(textOutput) */
  imbImageProcessedData() {
    return new Promise(resolve => {
      var images_file = this.fs.createReadStream(this.filePath); //gets the path of the image file
      var parameters = {
        images_file: images_file, // The image file is loaded here to IBM
      };

      visualRecognition.detectFaces(parameters, function(error, response) {
        if (error) {;
          resolve(error);
        } else {
          var faceTotalNumber = response.images[0].faces.length; // gets the total number of faces in the image (User Story 4)
          var textOutput = "The image has " +  faceTotalNumber; // The beginning of combining the text for conversion to speech
          var faceLocation = []; // Stores all the locations of the face: horizontal position, vertical, and starting point in x,y

          if (faceTotalNumber > 1) { // goes in here if there is more than one face detected
            textOutput += " people."; //adds people in a text, whenever there are more than 1 person
            for (var i=0; i < faceTotalNumber; i++) {
              var faceGender = response.images[0].faces[i].gender["gender"]; // Detects the gender for each face in the image (User story 5)
              var avgFaceAge = (response.images[0].faces[i].age["min"] + response.images[0].faces[i].age["max"]) / 2; // Gets the average age by adding the min and max age then dividing by 2 (User story 6)
              faceLocation.push(response.images[0].faces[i].face_location); // pushes the face location info to the table
              var faceNumber = i+1; // makes user friendly face counter (changes 0 to 1 - the start)
              textOutput +=  " Person number " + faceNumber + //proceeds combining the text for speech conversion
                                " is a " + faceGender +
                                " and the average age is " + avgFaceAge + ".";
            };
          } else { // if only 1 face detected on the image
            var faceGender = response.images[0].faces[0].gender["gender"]; // Goes here when the image has only one person and gets the gender
            var avgFaceAge = (response.images[0].faces[0].age["min"] + response.images[0].faces[0].age["max"]) / 2; // Gets the average age by adding the min and max age then dividing by 2 (User story 6)
            faceLocation.push(response.images[0].faces[0].face_location); //pushes location of 1 face to the table
            textOutput += " person. Person is " + faceGender + //proceeds combining the text for speech conversion
                          " and the average age is " + avgFaceAge + ".";
          };
          resolve([textOutput,faceLocation]); //sends the output and the locaiton of faces to the server whenver "resolve" is detected, to ensure that class runs on time
        };
      });
    });
  };
};

module.exports = faceRecognition;
