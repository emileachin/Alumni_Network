const logger = require('./logger')
const jwt = require('jsonwebtoken')

//Logging middleware
const requestLogger = (request, response, next) => {
    logger.info("Method: ", request.method)
    logger.info("Path: ", request.path)
    logger.info("Body: ", request.body)
    logger.info("----------")
    next()
}

// Unknown endpoint middleware
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

// Authentication middleware to validate JWT tokens
const authentication = async (request, response, next) => {
    try {
        //Find token from authorization header
        const token = request.header("Authorization").replace("Bearer ", "")

        //Verify if token is valid
        const decodedToken = jwt.verify(token, process.env.SECRET)

        //If token is not valid return error
        if (!decodedToken) {
            return response.status(401).json({ error: "Invalid token" })
        }
        
        const user = await User.findById(decodedToken.id)
        
        if (!user) {
            return response.status(401).json({ error: "User not found" })
        }

        request.user = user 
        next()
    }
    catch (error) {
        response.status(401).send({ error: 'Error authenticating' })
    }
}

// Custom error handling middleware
const errorHandler = (error, request, response, next) => {
    logger.error(error.message)

    if (error.name === 'CastError') {
      return response.status(400).send({ error: 'malformatted id' })
    }
    else if (error.name === 'ValidationError' || error.name === 'ValidatorError') {
      return response.status(400).json({ 
        error: error.message 
      })}
      else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
        return response.status(400).json({ error: 'expected `username` to be unique' })
      }
    else if (error.name ===  'JsonWebTokenError') {
      return response.status(401).json({ error: 'token JSON prob' })
    }
    else if (error.name === 'TokenExpiredError') {
      return response.status(401).json({
        error: 'token expired'
      })
    }
  
    next(error)
}

module.exports = { requestLogger, unknownEndpoint, authentication, errorHandler }