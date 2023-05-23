
const express = require('express');
const cors = require('cors');
const userRoutes = require('./routes/user-routes');
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


app.use('/api/v1/',userRoutes)

mongoose.set('strictQuery', true);


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to Mongoose'));
/*
const openai = new OpenAIApi(config);

const runPrompt = async () => {
	const prompt = `
        write me a joke about a cat and a bowl of pasta. Return response in the following parsable JSON format:

        {
            "Q": "question",
            "A": "answer"
        }

    `;

	const response = await openai.createCompletion({
		model: "text-davinci-003",
		prompt: prompt,
		max_tokens: 2048,
		temperature: 1,
	});

	const parsableJSONresponse = response.data.choices[0].text;
	const parsedResponse = JSON.parse(parsableJSONresponse);

	console.log("Question: ", parsedResponse.Q);
	console.log("Answer: ", parsedResponse.A);
};

runPrompt();
*/
/*
app.get('/index', (req, res) => {
  res.render('index.ejs');
});

app.get('/register', (req, res) => {
  res.render('register.ejs');
});

app.get('/login', (req, res) => {
  res.render('login.ejs');
});
*/




// POST route for processing the registration form

app.post('/api/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/api/login', async (req, res) => {
	const user = await User.findOne({
		email: req.body.email,
	})

	if (!user) {
		return { status: 'error', error: 'Invalid login' }
	}

	const isPasswordValid = await bcrypt.compare(
		req.body.password,
		user.password
	)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			},
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})



module.exports = app;