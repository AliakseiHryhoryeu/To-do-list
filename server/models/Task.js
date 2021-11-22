const { Schema, model } = require("mongoose")


const Task = new Schema({
    id: { type: Number, required: true },
    ListId: { type: String, required: true },
    text: { type: String, required: true },
    completed: { type: Array, required: true, default: false },
})



module.exports = model('Task', Task)