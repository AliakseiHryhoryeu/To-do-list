const { Schema, model } = require("mongoose")

const List = new Schema({
    name: { type: String, required: true },    
    description: { type: String, default: '',required: true },
    userId: { type: String, required: true },
    colorId: { type: Array, required: true },
    taskId: { type: Array, required: false }
})

module.exports = model('List', List)