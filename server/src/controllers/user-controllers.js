const User = require('../model/User.js')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const JWT_SECRET_KEY="MyKey"

const signup = async(req,res,next) => {
  const{name,email,password} =req.body;
  let existingUser;

  try{
    existingUser = await User.findOne({email:email})

  }catch(err){
    console.log(err);
  }
if(existingUser){
  return res.status(400).json({message:"User Already Exists,Login Instead"})
}

const hashedPassword= bcrypt.hashSync(password)
  const user = new User({
    name, // name:name
    email,
    password:hashedPassword,
})

try{
  await user.save()
}catch(err){
  console.log(err)
}

return res.status(201).json({message:user})
}


const login = async (req, res, next) => {
  const { email, password } = req.body;

  let existingUser;
  try {
    existingUser = await User.findOne({ email: email });
  } catch (err) {
    return new Error(err);
  }
  if (!existingUser) {
    return res.status(400).json({ message: "User not found. Signup Please" });
  }
  const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password)
  if(!isPasswordCorrect) {
    return res.status(400).json({ message: "Invaild Email/Password" })
  }
  const token = jwt.sign({id:existingUser._id},JWT_SECRET_KEY,{
    expiresIn: "1hr"
  })
  return res.status(200).json({ message:"Successfly Logged In",user:existingUser,token})
}
const verifyToken = (req, res,next) => {
  const headers = req.headers[ `authorization`];
  const token = headers.split('')[1]
  console.log(headers)
}

exports.signup = signup
exports.login = login
exports.verifyToken = verifyToken