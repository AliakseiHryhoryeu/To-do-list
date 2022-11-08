const { Schema, model } = require('mongoose')

const User = new Schema({
	username: { type: String, required: true },
	email: { type: String, required: true },
	password: { type: String, required: true },
	listId: { type: Array, required: false },
})

module.exports = model('users', User)
