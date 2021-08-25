/** @desc completed by Sanjay Sekar Samuel & Maxim Zaika

          The following code is uncommented and is used for testing purposes only.
          Some portion of the code has been removed as well. Please, refer to the original
          code.
*/

var VisualRecognitionV3 = require('watson-developer-cloud/visual-recognition/v3');
var visualRecognition = new VisualRecognitionV3({
  version: '2018-03-19',
  api_key: '295ce6bca5ffe711bd522fe62e89418a36c6d764'
});

class faceRecognition {
  constructor (fs, imageLocation) {
    this.fs = fs;
    this.filePath = imageLocation;
  }

  async imageDataOutput() {
    return await this.imbImageProcessedData();
  }

  imbImageProcessedData() {
    return new Promise(resolve => {
      var images_file = this.fs.createReadStream(this.filePath);
      var parameters = {
        images_file: images_file,
      };

      visualRecognition.detectFaces(parameters, function(error, response) {
        if (error) {;
          resolve(error);
        } else {
          var faceTotalNumber = response.images[0].faces.length; //user story #4
          var textOutput = "The image has " +  faceTotalNumber;
          var facesArray = []

          if (faceTotalNumber > 1) {
            textOutput += " people.";
            for (var i=0; i < faceTotalNumber; i++) {
              var faceGender = response.images[0].faces[i].gender["gender"]; //user story #5
              var avgFaceAge = (response.images[0].faces[i].age["min"] + response.images[0].faces[i].age["max"]) / 2; //user story #6
              var faceNumber = i+1;
              facesArray.push(avgFaceAge);
            }
          } else {
            var faceGender = response.images[0].faces[0].gender["gender"]; //user story #5
            var avgFaceAge = (response.images[0].faces[0].age["min"] + response.images[0].faces[0].age["max"]) / 2; //user story #6
            facesArray.push(avgFaceAge);
          }
          resolve([faceTotalNumber, facesArray]);
        }
      });
    });
  }
}

module.exports = faceRecognition;
