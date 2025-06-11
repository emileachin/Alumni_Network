const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const config = require('./utils/config')
const middleware = require("./utils/middleware")
const alumniRouter = require('./controllers/alumni')
const loginRouter = require('./controllers/login')
const registerRouter = require('./controllers/register')
const matchesRouter = require('./controllers/matches')
const logger = require('./utils/logger')

const app = express()

mongoose.set('strictQuery', false)

//Connect to databse
mongoose.connect(config.MONGODB_URI).then(() => {
    logger.info("Mongoose DB is connected")
}).catch(error => logger.error("Error connecting to database: ", error))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

//Register and login routes
app.use("/api/register", registerRouter)
app.use("/api/login", loginRouter)

//Authentication middleware
app.use(middleware.authentication)

//Alumni routes
app.use("/api/alumni", alumniRouter)
app.use("/api/matches", matchesRouter)

//Middleware for unknown endpoint and error handling
app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app