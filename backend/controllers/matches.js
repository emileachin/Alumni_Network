const matchesRouter = require('express').Router();
const Alumni = require('../models/alumni');

matchesRouter.get('/', async (request, response) => {
    try {
        const currentUser = request.user

        // Clean and normalize the search terms
        const userUniversity = currentUser.postSecondaryInstuition?.trim().toLowerCase()
        const userProgram = currentUser.program?.trim().toLowerCase()

        // Match using case-insensitive regex
        const matches = await Alumni.find({
            $or: [
                { 
                    postSecondaryInstuition: {
                        $regex: new RegExp(`^${userUniversity}$`, 'i')
                    }
                },
                { 
                    program: {
                        $regex: new RegExp(`^${userProgram}$`, 'i')
                    }
                }
            ],
            // Exclude current user from matches
            _id: { $ne: currentUser._id } 
        }).select('-password -__v -username')

        if (matches.length === 0) {
            return response.status(404).json({ 
                message: 'No matches found for your university or program' 
            })
        }
        
        // Return the matches without sensitive information
        response.json(matches)
    } catch (error) {
        console.error('Matching error:', error)
        response.status(500).json({ error: 'Error finding matches' })
    }
})

module.exports = matchesRouter;