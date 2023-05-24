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
  res.cookie(String(existingUser._id),token,{
    path:'/',
    expires:new Date(Date.now()+1000*30),
    httpOnly:true,
    sameSite: "lax",
  })

  return res.status(200).json({ message:"Successfly Logged In",user:existingUser,token})
}
const verifyToken = (req, res,next) => {
  const cookies = req.headers.cookie
  const token = cookies.split("=")[1]
  console.log("token")

  if(!token){
    res.status(404).json({ message:"No token found"})
  }
  jwt.verify(String(token),JWT_SECRET_KEY,(err,user)=>{
    if(err){
     return res.status(400).json({message:"Invaild Token"})
    }
    console.log(user.id)
    req.id = user.id

  })
  // Pass the user object to the next middleware
 next()
}

const getUser = async(req, res, next) => {
  const userId =  req.id ;
  let user ;

  try{
    user = await User.findById(userId,"-password")
  }catch(err){
    return new Error(err)
  }
  if(!user){
    return res.status(404).json({message:"User not found"})
  }
  return res.status(200).json({user})
}


exports.signup = signup
exports.login = login
exports.verifyToken = verifyToken
exports.getUser = getUser