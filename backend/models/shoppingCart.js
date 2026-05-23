const mongoose = require("mongoose")

const shoppingCartSchema = new mongoose.Schema({
    id: String,
    name: String,
    type: String,
    price: Number,
    quantity: Number,
    ingredients: [String],
    extraIngredients: [
        {
            name: String,
            price: Number,
            image: String
        }
    ],
    totalPrice: Number,
    image: String
})

module.exports = mongoose.model("shoppingcarts", shoppingCartSchema)