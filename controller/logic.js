const { json } = require("express")
const { admins, products, users, carts, wishlists } = require("../models/collection")


//logic

const adminLogin = (req, res) => {
    const { uname, psw } = req.body
    admins.findOne({ uname, psw }).then(admin => {
        if (admin) {
            res.status(200).json({
                message: "login successful",
                status: true,
                statusCode: 200
            })
        }
        else {
            res.status(404).json({
                message: "Login details are Incorrect",
                status: false,
                statusCode: 404
            })
        }
    })
}


const addProduct = (req, res) => {
    const { pname, price, image } = req.body
    const newProduct = new products({
        pname, price, image
    })
    newProduct.save()
    res.status(200).json({
        message: "new product added",
        status: true,
        statusCode: 200
    })

}

const getProducts = (req, res) => {

    products.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200

            })
        }
    })
}

const editProduct = (req, res) => {
    const { id } = req.params
    const { pname, price, image } = req.body
    products.findOne({ _id: id }).then(pdata => {
        if (pdata) {
            pdata.pname = pname
            pdata.price = price
            pdata.image = image

            pdata.save()
            res.status(200).json({
                message: "Product updated",
                status: true,
                statusCode: 200
            })
        }
    })
}

const deleteProduct = (req, res) => {
    const { id } = req.params
    products.deleteOne({ _id: id }).then(data => {
        res.status(200).json({
            message: "Product Deleted",
            status: true,
            statusCode: 200
        })
    })
}

const getSingleProduct = (req, res) => {
    const { id } = req.params
    products.findOne({ _id: id }).then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                statusCode: 200,
                status: true
            })
        }
        else {
            res.status(404).json({
                message: "No product Found",
                statusCode: 404,
                status: false
            })
        }
    })
}

const userSignup = (req, res) => {
    const { email, psw } = req.body
    users.findOne({ email }).then(user => {
        if (user) {
            res.status(404).json({
                message: "User already exists",
                status: false,
                statusCode: 404
            })
        }
        else {

            newUser = new users({
                email, psw
            })
            newUser.save()
            res.status(200).json({
                message: 'New User created',
                statusCode: 200,
                status: true
            })
        }
    })
}

//----------------------------------------------------------------

const userLogin = (req, res) => {
    const { email, psw } = req.body
    users.findOne({ email, psw }).then(user => {
        if (user) {
            res.status(200).json({
                message: "login successful",
                status: true,
                statusCode: 200,
                _id: user._id
            })
        }
        else {
            res.status(404).json({
                message: "Login details are Incorrect",
                status: false,
                statusCode: 404
            })
        }
    })
}

//----------------------------------------------------------------

const addtoCart = (req, res) => {
    const { userId, pId } = req.body


    carts.findOne({ userId, pId }).then(data => {
        if (data) {

            data.quantity += 1
            data.totalPrice = data.quantity * data.price
            data.save()
            res.status(200).json({
                message: "Product added to cart",
                statusCode: 200,
                status: true

            })

        }
        else {

            products.findOne({ _id: pId }).then(product => {
                if (product) {
                    newCart = new carts({
                        userId,
                        pId,
                        pname: product.pname,
                        price: product.price,
                        image: product.image,
                        quantity: 1,
                        totalPrice: product.price
                    })
                    newCart.save()
                    res.status(200).json({
                        message: "Product added to cart",
                        statusCode: 200,
                        status: true

                    })
                }
            })


        }
    })



}

//------------------------------------------------------------

const cartCount = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products.length,
                statusCode: 200,
                status: true
            })
        }

    })

}

// ----------------------------------------------------------

const cartItems = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                statusCode: 200,
                status: true
            })
        }
    })
}

// ----------------------------------------------------------

const totalPrice = (req, res) => {
    const { userId } = req.params
    carts.find({ userId }).then(products => {
        if (products) {
            // console.log(products);
            if (products.length > 0) {
                total = products.map(i => i.totalPrice).reduce((i1, i2) => i1 + i2)
                // console.log(total);
                // console.log(products);
                res.status(200).json({
                    message: total,
                    statusCode: 200,
                    status: true
                })
            }
        }
    })
}

// ---------------------------------------------------------

const QuantityIncrement = (req, res) => {
    const { _id } = req.params
    carts.findOne({ _id }).then(data => {
        if (data) {
            data.quantity += 1
            data.totalPrice = data.price * data.quantity
            data.save()
            res.status(200).json({
                message: data.quantity,
                statusCode: 200,
                status: true,
                price: data.totalPrice
            })
        }
    })
}

// -------------------------------------------------------

const QuantityDecrement = (req, res) => {
    const { _id } = req.params
    carts.findOne({ _id }).then(data => {
        if (data) {
            if (data.quantity > 1) {
                data.quantity -= 1
                data.totalPrice = data.price * data.quantity

                data.save()
                res.status(200).json({
                    message: data.quantity,
                    statusCode: 200,
                    status: true,
                    price: data.totalPrice

                })
            }

            else {
                res.status(404).json({
                    message: "Quantity can not be less than one",
                    statusCode: 404,
                    status: false
                })
            }
        }
    })
}

// --------------------------------------------------

const removeItem = (req, res) => {
    const { _id } = req.params
    carts.deleteOne({ _id }).then(data => {
        res.status(200).json({
            message: "Item removed from cart!",
            statusCode: 200,
            status: true
        })
    })
}

// ----------------------------------------------------------

const addWishlist = (req, res) => {
    const { userId, pId } = req.body


    wishlists.findOne({ userId, pId }).then(data => {
        if (data) {
            res.status(400).json({
                message: "Product already in wishlist",
                statusCode: 400,
                status: false

            })

        }
        else {

            products.findOne({ _id: pId }).then(product => {
                if (product) {
                    newWishlist = new wishlists({
                        userId,
                        pId,
                        pname: product.pname,
                        price: product.price,
                        image: product.image,

                    })
                    newWishlist.save()
                    res.status(200).json({
                        message: "Product added to wishlist",
                        statusCode: 200,
                        status: true

                    })
                }
            })


        }
    })



}

// ------------------------------------------------------------------

const wishlistItems = (req, res) => {
    const { userId } = req.params
    wishlists.find({ userId }).then(products => {
        if (products) {
            res.status(200).json({
                message: products,
                statusCode: 200,
                status: true
            })
        }
    })
}

// -----------------------------------------------

const removeWishlist = (req, res) => {
    const { _id } = req.params
    wishlists.deleteOne({ _id }).then(data => {
        res.status(200).json({
            message: "Item removed from wishlist!",
            statusCode: 200,
            status: true
        })
    })
}

// ------------------------------------------

const getUsers = (req, res) => {

    users.find().then(data => {
        if (data) {
            res.status(200).json({
                message: data,
                status: true,
                statusCode: 200

            })
        }
    })
}

// -------------------------------------------------------

const deleteUser = (req, res) => {
    const { _id } = req.params
    users.deleteOne({ _id }).then(data => {
        carts.deleteMany({ userId: _id }).then(data => {
            wishlists.deleteMany({ userId: _id }).then(data => {
                res.status(200).json({
                    message: "User Deleted",
                    status: true,
                    statusCode: 200
                })
            })
        })

    })
}


module.exports = {
    adminLogin, addProduct, getProducts, editProduct, deleteProduct,
    getSingleProduct, userSignup, userLogin, addtoCart, cartCount, cartItems, totalPrice, QuantityIncrement,
    QuantityDecrement, removeItem, addWishlist, wishlistItems, removeWishlist, getUsers, deleteUser
}