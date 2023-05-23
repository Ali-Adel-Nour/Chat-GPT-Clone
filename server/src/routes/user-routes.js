const express = require('express');

const router = express.Router();

const {signup,login,verifyToken} = require('../controllers/user-controllers');



router.post('/signup',signup)

router.post("/login",login)
router.get("/user",verifyToken)
module.exports = router