//import(logic funstions)
const express = require('express')
const { adminLogin, addProduct, getProducts, editProduct, deleteProduct, getSingleProduct, userSignup, userLogin, addtoCart, cartCount, cartItems, totalPrice, QuantityIncrement, QuantityDecrement, removeItem, addWishlist, wishlistItems, removeWishlist, getUsers, deleteUser } = require('../controller/logic')


//router object
const router = new express.Router()

//login request
router.post('/admin/login', adminLogin)

router.post('/admin/add-product', addProduct)

router.get('/products-access', getProducts)

router.put('/product-update/:id', editProduct)

router.delete('/product-delete/:id', deleteProduct)

router.get('/one-product/:id', getSingleProduct)

router.post('/user-signup', userSignup)

router.post('/user-login', userLogin)

router.post('/addtocart', addtoCart)

router.get('/cart-count/:userId', cartCount)

router.get('/cart-items/:userId', cartItems)

router.get('/totalprice/:userId', totalPrice)

router.get('/increment/:_id', QuantityIncrement)

router.get('/decrement/:_id', QuantityDecrement)

router.delete('/removeitem/:_id', removeItem)

router.post('/addtowishlist', addWishlist)

router.get('/wishlist-items/:userId', wishlistItems)

router.delete('/remove-wishlist/:_id', removeWishlist)

router.get('/user-access', getUsers)

router.delete('/user-delete/:_id', deleteUser)


//export router
module.exports = router 