// require node's http 
const http = require("http");

//require File System module with built-in promises method. 
const fileSys = require('fs').promises;

//declare response function for incoming http requests 
//use FS module to read file, this returns a promise. 
//After promise is returned, we use .then() method to set and write the header, and send back varying contents, depending on which url sends the request
const httpListener = function (request, response) {
  
  console.log(request.url);

  if (request.url === "/") {
    // for root url, send 
    fileSys.readFile(__dirname + "/index.html")
      .then(data => {
        // set response header, response code, and send back an HTML file type to close
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
        response.writeHead(200);
        response.end(data);
      });
  } else {
    // for any other url path other than the root, send back the raw JSON data
    fileSys.readFile(__dirname + "/users.json")
      .then(data => {
        // set response header, response code, and send back raw JSON data to close
        response.setHeader("Content-Type", "application/json; charset=UTF-8");
        response.writeHead(200);
        response.end(data);
      });

  }
  
};

// declare our new http server
const newServer = http.createServer(httpListener);

// declare port and host where we will be listening
const myIP = "0.0.0.0";
const myTcpPort = "8080";

// use the listen method on our new server to get it up and running
newServer.listen(
  myTcpPort, myIP, () => {
    console.log(`Voila! Your new server is up at http://${myIP}:${myTcpPort}`);
  }
);
