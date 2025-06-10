const alumniRouter = require('express').Router();
const { Alumni } = require('../models/alumni');
const logger = require('../utils/logger');

alumniRouter.get('/', async (request, response) => {
    try {
        logger.info('Token received:', request.headers.authorization) 
        // Fetch all alumni from the database
        const alumni = await Alumni.find({});
        logger.info('Alumni fetched successfully:', alumni.length, 'records found');

        // Check if any alumni were found
        if (!alumni || alumni.length === 0) {
            logger.info('No alumni found');
            return response.status(404).json({ message: 'No alumni found' });
        }

        // Send the alumni data as a JSON response
        response.json(alumni);
    } catch (error) {
        logger.error('Error fetching alumni:', error);
        response.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = alumniRouter;