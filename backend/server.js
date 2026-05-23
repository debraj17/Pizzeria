const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const pizza = require("./models/pizza");
const ingredient = require("./models/ingredient");
const shoppingCart = require("./models/shoppingCart");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/PIZZARIADB")
.then(() => {
    console.log("mongodb connected")
})
.catch((err) => {
    console.log("mongodb does not connected", err)
})

//Fetch all the pizza from pizza database
app.get("/pizza", async(req, res) =>{
    try{
        const data = await pizza.find()
        res.json(data)
    }
    catch(err){
        res.status(500).json({
            message : "error to fetch pizzas"
        })
    }
})




//Fetch all the ingredients from ingredient database
app.get("/ingredient", async(req, res) => {
    try{
        const data = await ingredient.find()
        res.json(data)
    }
    catch(err){
        res.status(500).json({
            message : "error to fetch ingredients"
        })
    }
})


//Insert an item to shoppingcart collection

app.post("/shoppingCart", async(req, res) => {

    try{

        const newItem = new shoppingCart(req.body)

        await newItem.save()

        res.status(201).json({
            message : "item added to cart",
            data : newItem
        })

    }

    catch(err){

        res.status(500).json({
            message : "error adding item to shoppingCart"
        })
    }
})



//Update shopping cart item
app.put("/shoppingCart/:id", async(req, res) => {
    try{
        const updatedItem = await shoppingCart.findByIdAndUpdate(
            req.params.id,
            {
                quantity: req.body.quantity,
                extraIngredients: req.body.extraIngredients,
                totalPrice: req.body.totalPrice
            },
            { new: true }
        )
        if(!updatedItem) return res.status(404).json({ message: "item not found" })
        res.json({
            message: "item updated",
            data: updatedItem
        })
    }
    catch(err){
        res.status(500).json({
            message: "error updating item"
        })
    }
})


// Delete an item from the shoppingcart 
app.delete("/shoppingCart/:id", async(req, res) => {

    try{

        await shoppingCart.findByIdAndDelete(req.params.id)

        res.json({
            message : "item deleted from cart"
        })

    }

    catch(err){

        res.status(500).json({
            message : "error deleting item"
        })
    }
})

//Fetch all shoppingcartitems from shoppingCart database
app.get("/shoppingCart", async(req, res) => {
    try{
        const data = await shoppingCart.find()
        res.json(data)
    }
    catch(err){
        res.status(500).json({
            message : "error to fetch shopping cart items"
        })
    }
})

// server initialization
app.listen(5000, () => {
    console.log("server started")
})


