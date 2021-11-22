const { Schema, model } = require("mongoose")


const Color = new Schema({
    id: { type: Number, required: true },
    hex: { type: String, required: true },
    name: { type: String, required: true },
})



module.exports = model('Color', Color)