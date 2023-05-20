


const express = require('express');
const cors = require('cors');
API_KEY = require('./config.js')
const path = require('path');

const bcrypt = require('bcrypt');

const mongoose = require('mongoose');

const app = express();


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}






app.use(express.json());
app.use(cors())
app.set('view-engine', 'ejs')
app.use(express.static('public'));
app.set('views', path.join(__dirname, '../views'));

mongoose.set('strictQuery', true);


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true })
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))
app.post('/completions',async (req,res)=>{

  const options = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{
        role: "user",
        content: req.body
      }],
      "max-tokens": 100,
    })
  };

try{

  const response = await fetch("https://api.openai.com/v1/completions", options);
    const data = await response.json();


  res.send(data)

}catch(error){
  console.error(error);
}
})

app.get('/index',  (req, res) => {
  res.render('index.ejs')
})

app.get('/register',  (req, res) => {
  res.render('register.ejs')
})

app.get('/login',  (req, res) => {
  res.render('login.ejs')
})

module.exports = app;
