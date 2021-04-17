import mongoose from 'mongoose'

const userSchema = mongoose.Schema({
    firstName: {
        type: String,
    },
    lastName:{
        type: String,
    },
    login: {
        type: String,
        required: true,
        unique:true
    },
    email: {
        type: String,
        required: true,
        unique:true
    },
    password: {
        type: String,
        required: true
    },
    isVerified: {
        type: Boolean,
        required: true,
        defualt: false
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    emailToken: {
        type: String,
        unique: true
    }

}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User