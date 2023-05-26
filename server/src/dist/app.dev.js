"use strict";

var express = require('express');

var cors = require('cors');

var userRoutes = require('./routes/user-routes');

var path = require('path');

var cookieParser = require('cookie-parser');

var mongoose = require('mongoose');

var app = express();

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

app.use(cookieParser());
app.use(express.json());
app.use(cors({
  credentials: true,
  origin: "http://localhost:3000"
}));
app.use('/api/v1/', userRoutes);
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

var fetchRandomJoke = function fetchRandomJoke() {
  var response, data, joke;
  return regeneratorRuntime.async(function fetchRandomJoke$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(fetch('https://v2.jokeapi.dev/joke/Any'));

        case 3:
          response = _context.sent;
          _context.next = 6;
          return regeneratorRuntime.awrap(response.json());

        case 6:
          data = _context.sent;

          if (data.error) {
            console.log('Error:', data.error);
          } else {
            joke = '';

            if (data.type === 'twopart') {
              joke = "".concat(data.setup, " ").concat(data.delivery);
            } else if (data.type === 'single') {
              joke = data.joke;
            }

            setMessage({
              role: 'ChatGPT',
              content: joke
            });
          }

          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](0);
          console.error('Error:', _context.t0);

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 10]]);
};

module.exports = app;