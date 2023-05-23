"use strict";

var express = require('express');

var cors = require('cors');

var userRoutes = require('./routes/user-routes');

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
/*
const openai = new OpenAIApi(config);

const runPrompt = async () => {
	const prompt = `
        write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	console.log("Question: ", parsedResponse.Q);
	console.log("Answer: ", parsedResponse.A);
};

runPrompt();
*/

/*
app.get('/index', (req, res) => {
  res.render('index.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});
*/
// POST route for processing the registration form

app.post('/api/register', function _callee(req, res) {
  var newPassword;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          console.log(req.body);
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.hash(req.body.password, 10));

        case 4:
          newPassword = _context.sent;
          _context.next = 7;
          return regeneratorRuntime.awrap(User.create({
            name: req.body.name,
            email: req.body.email,
            password: newPassword
          }));

        case 7:
          res.json({
            status: 'ok'
          });
          _context.next = 13;
          break;

        case 10:
          _context.prev = 10;
          _context.t0 = _context["catch"](1);
          res.json({
            status: 'error',
            error: 'Duplicate email'
          });

        case 13:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 10]]);
});
app.post('/api/login', function _callee2(req, res) {
  var user, isPasswordValid, token;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(User.findOne({
            email: req.body.email
          }));

        case 2:
          user = _context2.sent;

          if (user) {
            _context2.next = 5;
            break;
          }

          return _context2.abrupt("return", {
            status: 'error',
            error: 'Invalid login'
          });

        case 5:
          _context2.next = 7;
          return regeneratorRuntime.awrap(bcrypt.compare(req.body.password, user.password));

        case 7:
          isPasswordValid = _context2.sent;

          if (!isPasswordValid) {
            _context2.next = 13;
            break;
          }

          token = jwt.sign({
            name: user.name,
            email: user.email
          }, 'secret123');
          return _context2.abrupt("return", res.json({
            status: 'ok',
            user: token
          }));

        case 13:
          return _context2.abrupt("return", res.json({
            status: 'error',
            user: false
          }));

        case 14:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = app;