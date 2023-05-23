const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
	{
		name: { type: String, required: true },
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true ,minLength:6},

	},

)
module.exports= mongoose.model('User', userSchema,'users')

