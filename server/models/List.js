const { Schema, model } = require("mongoose")

const List = new Schema({
    id: { type: Number, required: true },
    name: { type: String, required: true },
    userId: { type: String, required: true },
    colorId: { type: Array, required: true },
    tasksId: { type: Array, required: true }
})

module.exports = model('List', List)