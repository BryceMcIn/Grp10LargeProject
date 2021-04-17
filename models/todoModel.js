import mongoose from 'mongoose'

const todoSchema = mongoose.Schema({
    userId: {
        type: String,
        required:true
    },
    todoItem: {
        type: String,
    },
    completed: {
        type: Boolean,
        default: false
    }
})

const ToDo = mongoose.model('ToDo', todoSchema)

export default ToDo