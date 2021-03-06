/*
* Test Runner
*/



//App Logic for test runner

_app = {};

//Container for the actual Test
_app.tests =  {};
_app.tests.unit=require('./unit');
//API Test
_app.tests.api =require('./api');

//Count the number of tests
_app.CountTest = () => {
    let counter = 0;

    for (let key in _app.tests) {
        if(_app.tests.hasOwnProperty( key)) {
            let subtest = _app.tests[key];
            for( let testname in subtest) {
                if( subtest.hasOwnProperty( testname)) {
                    counter++;
                }
            }
        }
    }
    return counter;
}


//Run all the Test, collect errors and report
_app.runTest = () => {
    let errors = [];
    let successes = 0;
    let limit = _app.CountTest();
    let counter = 0;

    for(let key in _app.tests) {
        if(_app.tests.hasOwnProperty(key)) {
            let subTest = _app.tests[key];
            for( let testName in subTest) {
                if( subTest.hasOwnProperty(testName)) {
                    ( function(){
                        let tmpTestName = testName;
                        let testValue = subTest[testName];
                        //call the test
                        try {
                            testValue( function() {
                                //if ok print test name in green
                                console.log('\x1b[32m%s\x1b[0m', tmpTestName);
                                counter++;
                                successes++;
                                if( counter == limit) {
                                    _app.produceTestReport( limit, successes, errors);
                                }
                            });
                        } catch(e) {
                            //push error in errores array
                            errors.push({'name':testName, 'error':e});
                            // print test name in red
                            console.log('\x1b[31m%s\x1b[0m', tmpTestName);
                            counter++;
                            if( counter == limit) {
                                _app.produceTestReport( limit, successes, errors);
                            }
                        }
                    })();
                }
            }
        }
    }
}




_app.produceTestReport = ( limit, successes, errors) => {
    console.log("");
    console.log("====================================================");
    console.log("==================BEGIN TEST REPORT=================");
    console.log("");
    console.log("TOTAL TEST RUN: ", limit);
    console.log("TOTAL TEST PASS: ", successes);
    console.log("TOTAL TEST FAIL: ", errors.length);
    console.log("");
    console.log("====================================================");
    
    if(errors.length>0) {
        console.log("==================BEGIN TEST REPORT ERROR DETAIL=================");
        errors.forEach(error => {
            console.log('\x1b[31m%s\x1b[0m', error.name);
            console.log(error.error);
            console.log("");
        });
        console.log("==================END TEST REPORT ERROR DETAIL =================");
    }

    console.log("==================END TEST REPORT=================");
    process.exit(0);
}

_app.runTest();