const express = require('express');
const cors = require('cors');
API_KEY = require('./config.js')
const app = express();

app.use(express.json());
app.use(cors())


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

module.exports = app;
