const Alumni = require('../models/alumni')
const registerRouter = require('express').Router()

registerRouter.post('/', async(request, response) => {
    // Extract fields from request body
    const { firstName, lastName, username, email, password, userType, highschoolGraduationYear, typeOfPostSecondary, postSecondaryInstuition, postSecondaryGradYear, currentCompany, jobPosition, linkedin } = request.body

    //Create new alumni object with request data
    const alumni = new Alumni({
        firstName,
        lastName,
        username,
        email,
        password,
        userType,
        highschoolGraduationYear,
        typeOfPostSecondary,
        postSecondaryInstuition,
        postSecondaryGradYear,
        currentCompany,
        jobPosition,
        linkedin
    })

    //Save alumni object to database
    const savedAlumni = await alumni.save()

    //Respond with saved alumni object if successful
    response.status(201).json(savedAlumni)
})

module.exports = registerRouter