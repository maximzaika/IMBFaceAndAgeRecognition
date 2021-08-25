/** @desc completed by Sanjay Sekar Samuel & Maxim Zaika

          To run the following code, type in the terminal: npm run test

          This is Mocha & Chai testers. Which allow programmers to perform
          proper Unit Testing / System Testing on the developed code. The code below,
          calls functions from the file "../server.js"
          This file is used for testing purposes only. No comments required
*/

const server =  require('../server');
const assert = require('chai').assert;

describe('server', function(){
  describe('image located at ./image/1.jpg', function(){
    it('testTotalNoFaces_1 should return 1', async function(){
      this.timeout(10000);
      testTotalNoFaces_1_result = await server.testTotalNoFaces_1();
      assert.equal(testTotalNoFaces_1_result, 1);

    });
    it('testAvgAge_1 should return 21.5', async function(){
      this.timeout(10000);
      testAvgAge_1_result = await server.testAvgAge_1();
      assert.deepEqual(testAvgAge_1_result, [21.5]);
    });
  });

  describe('image located at ./image/2.jpg', function(){
    it('testTotalNoFaces_2 should return 2', async function(){
      this.timeout(10000);
      testTotalNoFaces_2_result = await server.testTotalNoFaces_2();
      assert.equal(testTotalNoFaces_2_result, 2);

    });
    it('testAvgAge_2 should return 43 & 34.5', async function(){
      this.timeout(10000);
      testAvgAge_2_result = await server.testAvgAge_2();
      assert.deepEqual(testAvgAge_2_result, [43,34.5]);
    });
  });

  describe('image located at ./image/3.jpg', function(){
    it('testTotalNoFaces_3 should return 2', async function(){
      this.timeout(10000);
      testTotalNoFaces_3_result = await server.testTotalNoFaces_3();
      assert.equal(testTotalNoFaces_3_result, 2);

    });
    it('testAvgAge_3 should return 39.5 & 21.5', async function(){
      this.timeout(10000);
      testAvgAge_3_result = await server.testAvgAge_3();
      assert.deepEqual(testAvgAge_3_result, [39.5,21.5]);
    });
  });

  describe('image located at ./image/5.jpg', function(){
    it('testTotalNoFaces_5 should return 5', async function(){
      this.timeout(10000);
      testTotalNoFaces_5_result = await server.testTotalNoFaces_5();
      assert.equal(testTotalNoFaces_5_result, 5);

    });
    it('testAvgAge_5 should return 31.5, 40, 24.5, 39.5 & 29.5', async function(){
      this.timeout(10000);
      testAvgAge_5_result = await server.testAvgAge_5();
      assert.deepEqual(testAvgAge_5_result, [31.5,40,24.5,39.5,29.5]);
    });
  });
});
