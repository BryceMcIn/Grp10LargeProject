import mongoose from 'mongoose'

const requestSchema = mongoose.Schema({
    senderId: {
        type: String,
        required: true
    },
    recieverId: {
        type: String,
        required: true
    },
})

const Request = mongoose.model('Request', requestSchema)

export default Request