// require node's http 
const http = require("http");

//require File System module with built-in promises method. 
const fileSys = require('fs').promises;

// create a function to respond to http requests
// special variable __dirname has absolute path of where node code is running
// if fs.readFile() successful, it returns data 
// use then() method to handle success - contents parameter contains HTML file data
const httpListener = function (request, response) {
  // output request url
  console.log(request.url);

  if (request.url === "/") {
    // check request url, if root, return html file
    fileSys.readFile(__dirname + "/index.html")
      .then(contents => {
        // set http response header entry
        response.setHeader("Content-Type", "text/html; charset=UTF-8");
        // return 200 OK http status code
        response.writeHead(200);
        // send back file contents + close response
        response.end(contents);
      });
  } else {
    // if request url not root, return json file
    fileSys.readFile(__dirname + "/users.json")
      .then(contents => {
        // set http response header entry
        response.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        response.writeHead(200);
        // send back file contents + close response
        response.end(contents);
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
