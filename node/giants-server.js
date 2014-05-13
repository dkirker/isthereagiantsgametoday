var http = require("http");
var url = require("url");
var config = require("./config.js");

console.log("Starting Giants server!");

if(isNaN(parseInt(config.httpPort))) {
    console.log("Invalid port set for HTTP in config.js!");
    return;
}

function returnError(errorCode, errorText, request, response)
{
    var headers = {
        "Content-type": "application/json"
    };
    var error = "{\"error\":\"" + errorText +
                "\",\"errorCode\":\"" +  errorCode + "\"}";

    response.writeHead(errorCode, headers);
    response.write(error, "utf8");
    response.end();

    return;
}

function returnResults(params, request, response)
{
    var headers = {
        "Content-type": "application/json"
    };
    var respCode = 200;
    var data = "{}";
    var dataEnc = "utf8";

    response.writeHead(respCode, headers);
    response.write(data, dataEnc);
    response.end();
    return;
}

function requestRecieved(request, response)
{
    var uri = url.parse(request.url);

    if (uri.pathname === config.apiEndpoint) {
        returnResults({}, request, response);
    } else {
        returnError(404, "NOT FOUND", request, response);
    }
}

var server = http.createServer(requestRecieved);

server.listen(config.httpPort);

