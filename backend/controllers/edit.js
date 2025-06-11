const editRouter = require('express').Router()
const Alumni = require('../models/alumni')
const logger = require('../utils/logger')

editRouter.get("/:username", async (request, response) => {
    try {
        const username = request.params.username
        logger.info('Fetch request received for ID:', id)

        // Fetch the alumni by ID
        const alumni = await Alumni.findOne({ username: username })
        
        if (!alumni) {
            logger.error('Alumni not found for ID:', id)
            return response.status(404).json({ error: 'Alumni not found' })
        }

        logger.info('Alumni fetched successfully:', alumni)
        response.json(alumni)
    } catch (error) {
        logger.error('Fetch error:', error.message)
        response.status(500).json({ 
            error: 'Server error during fetch',
            details: error.message 
        })
    }
})

editRouter.put("/:id", async (request, response) => {
    try {
        const id = request.params.id
        const updatedData = request.body

        logger.info('Update request received for ID:', id)
        logger.info('Update data:', updatedData)

        // Check if the alumni exists
        const existingAlumni = await Alumni.findById(id)
        if (!existingAlumni) {
            logger.error('Alumni not found for ID:', id)
            return response.status(404).json({ error: 'Alumni not found' })
        }

        // Update the alumni
        const updated = await Alumni.findByIdAndUpdate(
            id, 
            updatedData, 
            {
                new: true, 
                runValidators: true,
                context: 'query'
            }
        )

        if (!updated) {
            logger.error('Error updating alumni for ID:', id)
            return response.status(400).json({ error: 'Update failed' })
        }

        logger.info('Alumni updated successfully:', updated)
        response.json(updated)
    } catch (error) {
        logger.error('Update error:', error.message)
        response.status(500).json({ 
            error: 'Server error during update',
            details: error.message 
        })
    }
})

module.exports = editRouter