

//import mongoose
const mongoose = require('mongoose')

//define schema
const adminSchema = new mongoose.Schema(
    {
        uname: String,
        psw: String
    }
)

//model - collectionName

const admins = new mongoose.model("admins", adminSchema)

// -----------------------------------------------------------------------------------

//product schema
const productSchema = new mongoose.Schema({
    pname: String,
    price: Number,
    image: String,

})

//model 
const products = new mongoose.model("products", productSchema)

// ----------------------------------------------------------------------------------------

//user
const userSchema = new mongoose.Schema({
    email: String,
    psw: String
})

const users = new mongoose.model("users", userSchema)

// --------------------------------------------------------------------------------------------

//carts
const cartSchema = new mongoose.Schema({
    userId: String,
    pId: String,
    pname: String,
    price: Number,
    image: String,
    quantity: Number,
    totalPrice: Number

})

const carts = new mongoose.model("carts", cartSchema);

// ---------------------------------------------------------

//wishlist
const wishlistSchema = new mongoose.Schema({
    userId: String,
    pId: String,
    pname: String,
    price: Number,
    image: String,


})

const wishlists = new mongoose.model("wishlists", wishlistSchema);


//export model - to import in another files
module.exports = { admins, products, users, carts, wishlists }