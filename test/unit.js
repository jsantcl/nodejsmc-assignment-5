/*
* UNIT TEST
*/


// Dependencies
const helperlib = require('../app/lib');
const assert = require('assert');

let unit = {};

unit['helperlib square(3) should return a number'] = ( done)=>{
    let value = helperlib.square(3);
    assert.equal(typeof(value),'number');
    done();
}

unit['helperlib square(12) should return 144'] = ( done)=>{
    let value = helperlib.square(12);
    assert.equal(value,12*12);
    done();
}

unit['helperlib square("x") should return NaN'] = ( done)=>{
    let value = helperlib.square('x');
    assert.ok( isNaN(value));
    done();
}



unit['helperlib power(2,10) should return 1024'] = ( done)=>{
    let value = helperlib.power(2,10);
    assert.equal(value,Math.pow(2,10));
    done();
}

unit['helperlib power(0,1) should return 1'] = ( done)=>{
    let value = helperlib.power(0,1);
    assert.equal(value,Math.pow(0,1));
    done();
}

unit['helperlib power("c","a") should return NaN'] = ( done)=>{
    let value = helperlib.power('c','a');
    assert.ok(isNaN(value));
    done();
}

unit['helperlib zeroPad(8,10) should return a string of length 10'] = ( done)=>{
    let value = helperlib.zeroPad(8,10);
    assert.ok( value.length == '0000000008'.length && typeof(value)=='string');
    done();
}

unit['helperlib zeroPad(4,-5) should return a string of first parameter when negative width is passed'] = ( done)=>{
    let value = helperlib.zeroPad(4,-5);
    assert.ok( value.length == '4'.length && typeof(value)=='string');
    done();
}

unit['helperlib zeroPad(number, Interger) should return NaN when invalid parameters are passed'] = ( done)=>{
    let value = helperlib.zeroPad(2,5.5);
    assert.ok( isNaN(value));
    done();
}


module.exports = unit;