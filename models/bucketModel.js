import mongoose from 'mongoose'

const bucketSchema = mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    bucketItem: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
    /* add image and caption*/
})

const Bucket = mongoose.model('Bucket', bucketSchema)

export default Bucket