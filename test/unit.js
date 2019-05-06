/*
* UNIT TEST
*/


// Dependencies
const helperlib = require('../app/lib');
const assert = require('assert');

let unit = {};


unit['helperlib getANUmber should return a number'] = ( done)=>{
    let value = helperlib.getANumber();
    assert.equal(typeof(value),'number');
    done();
}

unit['helperlib getANUmber should return 1'] = ( done)=>{
    let value = helperlib.getANumber();
    assert.equal(value,1);
    done();
}


unit['helperlib getANUmber should not return 2'] = ( done)=>{
    let value = helperlib.getANumber();
    assert.equal(value,2);
    done();
}



module.exports = unit;