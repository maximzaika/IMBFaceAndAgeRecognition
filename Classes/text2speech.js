/*** @desc Unit: FIT140 Advanced Programming
           Visual Recogntion and text-to-speech conversion.

           The following file is the Server side file.
           It gets triggered by the @class TimerObserver.

     @author Maxim Zaika (26437929); Sanjay Sekar Samuel (25036335);
     @requires watson https://www.npmjs.com/package/watson-developer-cloud */

var TextToSpeechV1 = require('watson-developer-cloud/text-to-speech/v1');
var text_to_speech = new TextToSpeechV1 ({
  username: '1b3e1f3d-e56c-44a1-83f9-71b953603468',
  password: '75RslpCUZCSE'
});

/** @class text2speech
    @classdesc gets triggered, when Visual Recognition pushes the text
               to the server. From where @class TimerObserver pushes the text
               to this class. This class accesses the IBM's "text to speech" conversion
               algorithm, and also receives the fully converted file from the IBM.
               Then tells the servers that conversion has been completed successfully.
    @param {string} this.fileName
    @param {object} this.fs
    @param {string} this.text
    @pre-condition @class TimerObserver recieves the data from @class faceRecognition
    @post-condition pushes the text converted by the @class daceRecognition to IBM
                    server to perform the text to speech conversion. After that receives
                    the file and saves it to the server's folder
    @return this.imbAudioProcessedData() : confirmation text */
class text2speech {
  constructor (fileIndex, fs, textOutput) {
    this.fileIndex = fileIndex;
    this.fs = fs;
    this.text = textOutput;
  };

  /** @pre-condition must be triggered by @class TimerObserver after @class faceRecognition
                     provides the text about the image
      @post-condition executes the code to process the text to speech on IBM server
      @return await this.imbAudioProcessedData() */
  async text2speechOutput() {
    return await this.imbAudioProcessedData(); // waits for the audio file to be created, only then pushes to the server
  };

  /** @pre-condition must be triggered by @function text2speechOutput() after @class faceRecognition
                     provides the text about the image
      @post-condition executes the code to process the text to speech on IBM server
      @return resolve('text to speech conversion succesful. Downloaded to ./Public/Audio/') */
  imbAudioProcessedData() {
    return new Promise(resolve => {
      var params = {
        text: this.text, // contains the text from the Visual Recognized that needs to be converted to speech
        voice: 'en-US_AllisonVoice', // selects the voice
        accept: 'audio/wav' // selects the audio format
      };

      text_to_speech.synthesize(params).on('error', function(error) { // Convertion of text to speech happens here
        resolve('Error:', error)
      }).pipe(this.fs.createWriteStream('./Public/audio/'+this.fileIndex+'.wav'));

      resolve('text to speech conversion succesful. Downloaded to ./Public/Audio/'); //this indicates that file is being stored
    });
  };
};

module.exports = text2speech;
