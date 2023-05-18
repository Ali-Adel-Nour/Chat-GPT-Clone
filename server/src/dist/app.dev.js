"use strict";

var express = require('express');

var cors = require('cors');

API_KEY = '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';
var app = express();
app.use(express.json());
app.use(cors());
API_KEY = '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';
app.post('/completions', function _callee(req, res) {
  var options, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = {
            method: 'POST',
            headers: {
              "Authorization": "Bearer ".concat(process.env.API_KEY),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "gbt-3.5-turbo",
              messages: [{
                role: "user",
                content: "how are you?"
              }],
              "max-tokens": 100
            })
          };
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(fetch("https://api.openai.com/v1/completions", options));

        case 4:
          response = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(response.json());

        case 7:
          data = _context.sent;
          res.send(data);
          _context.next = 14;
          break;

        case 11:
          _context.prev = 11;
          _context.t0 = _context["catch"](1);
          console.error(_context.t0);

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 11]]);
});
module.exports = app;