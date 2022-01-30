const { Schema, model } = require("mongoose")


const Task = new Schema({
    ListId: { type: String, required: true },
    text: { type: String, required: true },
    completed: { type: Array, required: true, default: false },
})


module.exports = model('task', Task)