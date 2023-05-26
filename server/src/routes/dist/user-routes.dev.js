"use strict";

var express = require("express");

var _require = require("../controllers/user-controllers"),
    signup = _require.signup,
    login = _require.login,
    verifyToken = _require.verifyToken,
    getUser = _require.getUser,
    refreshToken = _require.refreshToken,
    logout = _require.logout;

var router = express.Router();
router.post("/signup", signup);
router.post("/login", login);
router.get("/user", verifyToken, getUser);
router.get("/refresh", refreshToken, verifyToken, getUser);
router.post("/logout", verifyToken, logout);
module.exports = router;