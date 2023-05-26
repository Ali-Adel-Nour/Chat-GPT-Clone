
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
const path = require('path');
const cookieParser = require('cookie-parser');



const mongoose = require('mongoose');

const app = express();


if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}





app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true,origin:"http://localhost:3000"}))



app.use('/api/v1/',userRoutes)

mongoose.set('strictQuery', true);


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));
const fetchRandomJoke = async () => {
  try {
    const response = await fetch('https://v2.jokeapi.dev/joke/Any');
    const data = await response.json();
    if (data.error) {
      console.log('Error:', data.error);
    } else {
      let joke = '';
      if (data.type === 'twopart') {
        joke = `${data.setup} ${data.delivery}`;
      } else if (data.type === 'single') {
        joke = data.joke;
      }
      setMessage({ role: 'ChatGPT', content: joke });
    }
  } catch (error) {
    console.error('Error:', error);
  }
};




module.exports = app;