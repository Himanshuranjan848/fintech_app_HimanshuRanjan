const express = require('express')
const app = express()
const auth = require("./auth.js")
const { MongoDBConnection } = require("./mongoDB")
const compression = require('compression')
const cors = require('cors')


// Middlewares
app.use(express.json())
app.use(compression())
app.use(cors())

MongoDBConnection()
//auth
app.use(auth.initialize())

// Define routes
app.use('/v1/user', require('./modules/user/controller/userController.js'))
app.use('/v1/transaction', require('./modules/transaction/controller/transactionController.js'))

module.exports = app
