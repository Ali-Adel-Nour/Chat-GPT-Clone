"use strict";

var User = require('../model/User.js');

var bcrypt = require('bcryptjs');

var jwt = require('jsonwebtoken');

var JWT_SECRET_KEY = "MyKey";

var signup = function signup(req, res, next) {
  var _req$body, name, email, password, existingUser, hashedPassword, user;

  return regeneratorRuntime.async(function signup$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, email = _req$body.email, password = _req$body.password;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context.sent;
          _context.next = 10;
          break;

        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);

        case 10:
          if (!existingUser) {
            _context.next = 12;
            break;
          }

          return _context.abrupt("return", res.status(400).json({
            message: "User Already Exists,Login Instead"
          }));

        case 12:
          hashedPassword = bcrypt.hashSync(password);
          user = new User({
            name: name,
            // name:name
            email: email,
            password: hashedPassword
          });
          _context.prev = 14;
          _context.next = 17;
          return regeneratorRuntime.awrap(user.save());

        case 17:
          _context.next = 22;
          break;

        case 19:
          _context.prev = 19;
          _context.t1 = _context["catch"](14);
          console.log(_context.t1);

        case 22:
          return _context.abrupt("return", res.status(201).json({
            message: user
          }));

        case 23:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 7], [14, 19]]);
};

var login = function login(req, res, next) {
  var _req$body2, email, password, existingUser, isPasswordCorrect, token;

  return regeneratorRuntime.async(function login$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(User.findOne({
            email: email
          }));

        case 4:
          existingUser = _context2.sent;
          _context2.next = 10;
          break;

        case 7:
          _context2.prev = 7;
          _context2.t0 = _context2["catch"](1);
          return _context2.abrupt("return", new Error(_context2.t0));

        case 10:
          if (existingUser) {
            _context2.next = 12;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "User not found. Signup Please"
          }));

        case 12:
          isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);

          if (isPasswordCorrect) {
            _context2.next = 15;
            break;
          }

          return _context2.abrupt("return", res.status(400).json({
            message: "Invaild Email/Password"
          }));

        case 15:
          token = jwt.sign({
            id: existingUser._id
          }, JWT_SECRET_KEY, {
            expiresIn: "1hr"
          });
          return _context2.abrupt("return", res.status(200).json({
            message: "Successfly Logged In",
            user: existingUser,
            token: token
          }));

        case 17:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 7]]);
};

var verifyToken = function verifyToken(req, res, next) {
  var headers = req.headers["authorization"];
  var token = headers.split('')[1];
  console.log(headers);
};

exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;