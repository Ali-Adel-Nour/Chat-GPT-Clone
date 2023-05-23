"use strict";

var express = require('express');

var router = express.Router();

var _require = require('../controllers/user-controllers'),
    signup = _require.signup,
    login = _require.login,
    verifyToken = _require.verifyToken;

router.post('/signup', signup);
router.post("/login", login);
router.get("/user", verifyToken);
module.exports = router;