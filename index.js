//import .env file
require('dotenv').config()


//import express
const express = require('express')
const router= require('./routes/router')
const cors = require('cors')


//2- create server using express
const server = express()

//integrate front-end
server.use(cors())




//to convert all incoming json data to js data
server.use(express.json())

//router set
server.use(router)

//import connection.js file
require('./database/connections')


//port

const port = 6565 || process.env.port

server.listen(port, () => {
    console.log(`_______server started at port number ${port}_______`);
})

// console.log("BASE_URL:", process.env.BASE_URL);
// console.log("All Environment Variables:", process.env);
