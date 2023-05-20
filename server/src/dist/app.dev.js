"use strict";

var express = require('express');

var cors = require('cors');

API_KEY = require('./config.js');

var path = require('path');

var bcrypt = require('bcrypt');

var mongoose = require('mongoose');

var app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(express.json());
app.use(cors());
app.set('view-engine', 'ejs');
app.use(express["static"]('public'));
app.set('views', path.join(__dirname, '../views'));
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DATABASE_URL, {
  useNewUrlParser: true
});
var db = mongoose.connection;
db.on('error', function (error) {
  return console.error(error);
});
db.once('open', function () {
  return console.log('Connected to Mongoose');
});
app.post('/completions', function _callee(req, res) {
  var options, response, data;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = {
            method: 'POST',
            headers: {
              "Authorization": "Bearer ".concat(API_KEY),
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              model: "gpt-3.5-turbo",
              messages: [{
                role: "user",
                content: req.body
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
app.get('/index', function (req, res) {
  res.render('index.ejs');
});
app.get('/register', function (req, res) {
  res.render('register.ejs');
});
app.get('/login', function (req, res) {
  res.render('login.ejs');
});
module.exports = app;