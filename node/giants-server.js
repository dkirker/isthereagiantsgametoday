var http = require('http');
var config = require('./config.js');

console.log("Starting Giants server!");

if(isNaN(parseInt(config.httpPort))) {
    console.log("Invalid port set for HTTP in config.js!");
    return;
}

function requestRecieved(request, response)
{

}

var server = http.createServer(requestRecieved);

server.listen(config.httpPort);

