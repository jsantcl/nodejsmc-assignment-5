const http = require('http');

debugger;
const hostname = '127.0.0.1';

debugger;
const port = 3000;

const server = http.createServer((req, res) => {
  
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  let retObj = {'name':'ping', 'status':'up'};

  res.end(JSON.stringify(retObj));  

});

server.init = (callback) => {
  server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

  callback();
}

if( require.main === module) {
  server.init( ()=>{});
}

module.exports = server;

