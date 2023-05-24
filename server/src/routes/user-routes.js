const express = require('express');

const router = express.Router();

const {signup,login,verifyToken,getUser} = require('../controllers/user-controllers');



router.post('/signup',signup)

router.post("/login",login)
router.get("/user",verifyToken,getUser)

//verify token
module.exports = router