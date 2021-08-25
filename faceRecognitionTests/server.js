/** @desc completed by Sanjay Sekar Samuel & Maxim Zaika

          To run the following code, type in the terminal: npm run test

          Each following function has predefined image which is located at:
          ./images/1.jpg. Each function gets called and tested by Mocha & Chai.
          Full explanation/comments of the code are located in the original file.
          This file is used for testing purposes only.

          Mocha & Chai folder located at: ./testIBMtest.js
*/

module.exports = {
  testTotalNoFaces_1: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/1.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var faceTotalNumber = imageTextData[0];
          resolve(faceTotalNumber);
      })();
    });
  },
  testAvgAge_1: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/1.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var avgFaceAge = imageTextData[1];
          resolve(avgFaceAge);
      })();
    });
  },
  testTotalNoFaces_2: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/2.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var faceTotalNumber = imageTextData[0];
          resolve(faceTotalNumber);
      })();
    });
  },
  testAvgAge_2: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/2.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var avgFaceAge = imageTextData[1];
          resolve(avgFaceAge);
      })();
    });
  },
  testTotalNoFaces_3: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/3.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var faceTotalNumber = imageTextData[0];
          resolve(faceTotalNumber);
      })();
    });
  },
  testAvgAge_3: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/3.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var avgFaceAge = imageTextData[1];
          resolve(avgFaceAge);
      })();
    });
  },
  testTotalNoFaces_4: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/4.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var faceTotalNumber = imageTextData[0];
          resolve(faceTotalNumber);
      })();
    });
  },
  testAvgAge_4: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/4.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var avgFaceAge = imageTextData[1];
          resolve(avgFaceAge);
      })();
    });
  },
  testTotalNoFaces_5: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/5.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var faceTotalNumber = imageTextData[0];
          resolve(faceTotalNumber);
      })();
    });
  },
  testAvgAge_5: function() {
    return new Promise(resolve => {
      var fs = require('fs');
      const faceRecognition = require('./Classes/faceRecognition.js');
      (async function () {
          var path = './images/5.jpg'
          var imageTextData = await new faceRecognition(fs, path).imageDataOutput();
          var avgFaceAge = imageTextData[1];
          resolve(avgFaceAge);
      })();
    });
  }
}
