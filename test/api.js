/*
* API Test
*/

// Dependencies
const app = require('../app/server');
const assert = require('assert');
const http = require('http');
//This is for json object response decoding
 const StringDecoder = require("string_decoder");


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

        res.setEncoding('utf8');
        let rawData = '';
        res.on('data', (chunk) => { rawData += chunk; });
        res.on('end', () => {
          try {
            const parsedData = JSON.parse(rawData);
            callback(res, parsedData);
          } catch (e) {
            console.error(e.message);
          }
        });
    });

    req.end();

};

helper.parseJsonToObject = ( str)=> {
    try {
        var obj = JSON.parse( str);
    } catch( e) {
        return {};
    }
    return obj;
}


// start the API
api['server init should not throw'] = (done) => {
    assert.doesNotThrow(()=>{
        app.init( (err)=>{
            done();
        });
    }, TypeError);
}


api['localhost should respond with 200'] = (done) => {
    helper.getTest('/', (res, parsedData)=>{
        assert.equal(res.statusCode, 200);
        done();
    });
}


api['localhost should repond with a json object'] = (done) => {
    helper.getTest('/', (res, parsedData)=>{
        assert.equal(typeof(parsedData), 'number')
        done();
    });
}


api['localhost should return an object with keys "name" and "status"'] = (done) => {
    let validKeys = ['name','status'];
    let errors = [];
    helper.getTest('/', (res, parsedData)=>{
        for (key in parsedData) {
            if( parsedData.hasOwnProperty(key)) {
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