const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

const alumniSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true,
        minlength: 6
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    userType: {
        type: String,
        enum: ['Student', 'Professional']
    },
    highschoolGraduationYear: {
        type: Number,
        required: true
    },
    typeOfPostSecondary: {
        type: String,
        enum: ['College', 'University', 'None']
    },
    postSecondaryInstuition: {
        type: String
    },
    postSecondaryGradYear: {
        type: Number
    },
    currentCompany: {
        type: String
    },
    jobPosition: {
        type: String
    },
    linkedin: {
        type: String
    },
   
})

alumniSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
        delete returnedObject.password
    }
})

alumniSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10)
    }
    next()
})

alumniSchema.methods.comparePassword = async function(password) {
    return await bcrypt.compare(password, this.password)
}

const Alumni = mongoose.model("Alumni", alumniSchema)

module.exports = Alumni 