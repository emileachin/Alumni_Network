const jwt = require('jsonwebtoken');
const Alumni = require('../models/alumni');
const loginRouter = require('express').Router()
const logger = require('../utils/logger')

loginRouter.post('/', async (request, response) => {
    //Extract username and password from request body
    const { username, password } = request.body

    //Find selected alumni in database
    const alumni = await Alumni.findOne({ username })

    //Check if password is correct
    const isMatch = await alumni.comparePassword(password)

    //If the password doesn't match or alumni doesn't exist return error
    if (!isMatch || !alumni) {
        logger.error("Invalid username or password")
        return response.status(401).json({ error: 'Invalid username or password' })
    }

    //If the password is correct create and sign (create) a JWT token with alumni username and id
    const userToken = jwt.sign({
        username: alumni.username,
        id: alumni.id
    }, process.env.SECRET, { expiresIn: 60*60 })

    //Return token and alumni info to frontend after successful login
    response.status(200).json({ token: userToken, username: alumni.username, name: alumni.firstName + " " + alumni.lastName})
})


module.exports = loginRouter