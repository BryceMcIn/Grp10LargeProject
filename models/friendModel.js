import mongoose from 'mongoose'

const friendSchema = mongoose.Schema({
    userId: {
        type: String,
        required: true
    },
    friendId: {
        type: String,
        required: true
    }
})

const Friend = mongoose.model('Friend', friendSchema)

export default Friend