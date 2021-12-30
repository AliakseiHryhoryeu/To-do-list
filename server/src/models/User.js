const { Schema, model } = require("mongoose")


const User = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    avatar: { type: String, required: false },
    ListId: { type: Array, required: false }
})



module.exports = model('User', User)