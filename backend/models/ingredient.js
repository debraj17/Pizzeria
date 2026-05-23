const mongoose = require("mongoose")

const ingredientSchema = new mongoose.Schema({

    id: {
        type: String,
        required: true},
    name: String,
    price: Number,
    image: String

})

module.exports = mongoose.model("ingredients", ingredientSchema)