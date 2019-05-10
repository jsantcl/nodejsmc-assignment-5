let helperlib = {};

//Equivalent to Math.pow()
helperlib.power = (base, exponent) => {
    if(typeof(base)=='number' && Number.isInteger(exponent)) {
        let result = 1;
    for (let count = 0; count < exponent; count++) {
      result *= base;
    }
    return result;
    } else {
        return NaN;
    }
    
};


helperlib.square = (x)  => { 
      const sqr = typeof(x)=='number' ? x*x : NaN;
      return sqr;
};

helperlib.zeroPad = (number, width) => {
    if (typeof(number)=='number' && Number.isInteger(width)) {
        let string = String(number);
        while (string.length < width) {
            string = "0" + string;
        }
        return string; 
    } else {
        return NaN;
    }
  }



module.exports = helperlib;