/*
* API Test
*/

// Dependencies
const app = require('../app/server');
const assert = require('assert');
const http = require('http');

// Main test object
let api = {};


// Test a get request on port 3000
helper = {};

helper.getTest = ( path, callback) => {

    //configure the request
    let requestDetails = {
        'protocol':'http:',
        'hostname':'localhost',
        'port':3000,
        'method':'GET',
        'path':path,
        'headers': { 'Content-Type':'application/json'}
    }

    //send the request
    let req = http.request(requestDetails, (res)=>{

        // Get the response data
        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          const data = JSON.parse(rawData);
          callback(res, data);
        });
    });

    req.end();
};

// start the API
api['server init should not throw'] = (done) => {
    assert.doesNotThrow(()=>{
        app.init( (err)=>{
            done();
        });
    }, TypeError);
}


// test status code returned by server
api['localhost should respond with 200'] = (done) => {
    helper.getTest('/', (res, data)=>{
        assert.equal(res.statusCode, 200);
        done();
    });
}


// test if json object is returned
api['localhost should repond with a json object'] = (done) => {
    helper.getTest('/', (res, data)=>{
        assert.equal(typeof(data), 'object');
        done();
    });
    
}

//test if object returned has keys name and status
api['localhost should return an object with keys "name" and "status"'] = (done) => {
    let validKeys = ['name','status'];
    let errors = [];
    helper.getTest('/', (res, data)=>{
        for (key in data) {
            if( data.hasOwnProperty(key)) {
                if( validKeys.indexOf(key)==-1) 
                    errors.push(key);
            }
        }
        assert.equal( errors.length, 0);
        done();
    });
}


// Export the test
module.exports = api;