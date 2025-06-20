const matchesRouter = require('express').Router();
const Alumni = require('../models/alumni');
const logger = require('../utils/logger');

matchesRouter.get('/', async (request, response) => {
    try {
        const currentUser = request.user

        logger.info('Token received:', request.headers.authorization) 

        // Clean and normalize the search terms

        class AlumniMatcher {
            async findMatches (student) {
                //Initialize matches depending on priority, 1. same program and university, 2. same university and 3. same program, different university
                const matches = {
                exact: [],
                sameUni: [],
                sameProgram: []
            }

            try {
                // Find exact matches 
                matches.exact = await this.findExactMatches(student)
                console.log("Exact Matches: ", matches.exact)

                // If exact matches are less than 1, look for second priority
                if (matches.exact.length < 1) {
                    matches.sameUni = await this.findUniversityMatches(student)
                    console.log(matches.sameUni)
                }

                // If first and second priority matches are less than 3, look for third priority 
                if ((matches.exact.length) + (matches.sameUni.length) < 3) {
                    matches.sameProgram = await this.findProgramMatches(student)
                    console.log("Same programs: ", matches.sameProgram)
                }

                // Sort matches by priority
                return this.sortMatches(matches)
            }
            catch (error) {
                logger.error("Error: ", error)
                return []
            }
            }


            async findExactMatches (student) {
                return await Alumni.find({
                    postSecondaryInstitution: {
                        $regex: new RegExp(`^${student.postSecondaryInstitution}$`, 'i')
                    },
                    postSecondaryProgram: {
                        $regex: new RegExp(`^${student.postSecondaryProgram?.trim().toLowerCase()}$`, 'i')
                    },
                    _id: { $ne: student._id } 
                }).select('-password -__v -username')
            }

            async findUniversityMatches (student) {
                return await Alumni.find({
                    postSecondaryInstitution: {
                        $regex: new RegExp(`^${student.postSecondaryInstitution}$`, 'i')
                    },
                    _id: { $ne: student._id } 
                }).select('-password -__v -username')
            }

            async findProgramMatches (student) {
                return await Alumni.find({
                    postSecondaryProgram: {
                        $regex: new RegExp(`^${student.postSecondaryProgram?.trim().toLowerCase()}$`, 'i')
                    },
                    _id: { $ne: student._id } 
                }).select('-password -__v -username')
            }

            sortMatches (matches) {
                // Group all matches into one array and set the matchType object to specified match priority

                const allMatches = [...matches.exact.map(match =>({...match.toObject(), matchType: 'exact', score: 1.0})), 
                    ...matches.sameUni.map(match => ({...match.toObject(), matchType: "sameUniversity", score: 0.7})),
                ...matches.sameProgram.map(match => ({...match.toObject(), matchType: "sameProgram", score: 0.5}))]

                const uniqueMatches = allMatches.filter(
                (alumnus, index, self) =>
                    index === self.findIndex(a => String(a.id) === String(alumnus.id))
                );

                return uniqueMatches.sort((a, b) => b.score - a.score)
            }
        }

        const matcher = new AlumniMatcher()
        const matches = await matcher.findMatches(currentUser)
        
        // Return the matches without sensitive information
        response.json(matches)
    } catch (error) {
        console.error('Matching error:', error)
        response.status(500).json({ error: 'Error finding matches' })
    }
})

module.exports = matchesRouter;