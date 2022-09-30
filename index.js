// require node's http 
const http = require("http");

//require File System module with promises method. 
const fileSys = require('fs').promises;

// create a function to respond to http requests
// special variable __dirname has absolute path of where node code is running
// if fs.readFile() successful, it returns data 
// use then() method to handle success - contents parameter contains HTML file data
const requestListener = function (req, res) {
  // output request url
  console.log(req.url);

  if (req.url === "/") {
    // check request url, if root, return html file
    fileSys.readFile(__dirname + "/index.html")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "text/html; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        // send back file contents + close response
        res.end(contents);
      });
  } else {
    // if request url not root, return json file
    fileSys.readFile(__dirname + "/users.json")
      .then(contents => {
        // set http response header entry
        res.setHeader("Content-Type", "application/json; charset=UTF-8");
        // return 200 OK http status code
        res.writeHead(200);
        // send back file contents + close response
        res.end(contents);
      });

  }
  
};

// create an http server instance
const server = http.createServer(requestListener);

// define the TCP port and IP address to tell our http server to listen to
const host = "0.0.0.0";
const port = "8080";

// call the listen() method to start listening to http requests
server.listen(
  port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
    // console.log("Server is running on http://" + host + ":" + port);
  }
);

// non-arrow function syntax of same code as lines 51-56 above
/*
server.listen(port, host, function() {
  console.log(`Server is running on http://${host}:${port}`);
});
*/