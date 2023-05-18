const express = require('express');
const cors = require('cors');
API_KEY = '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'
const app = express();

app.use(express.json());
app.use(cors());

API_KEY = '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'

app.post('/completions',async (req,res)=>{

  const options = {
    method: 'POST',
    headers: {
      "Authorization": `Bearer ${process.env.API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gbt-3.5-turbo",
      messages: [{
        role: "user",
        content: "how are you?"
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
