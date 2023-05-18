"use strict";

var http = require('http');

var app = require('./app');

var PORT = process.env.PORT || 8000;
var server = http.createServer(app);
server.listen(PORT, function () {
  console.log("Listening on port ".concat(PORT));
});