const { Schema, model } = require("mongoose")


const User = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    username: { type: String, required: true },
    listsId: { type: Array, required: false }
})



module.exports = model('User', User)