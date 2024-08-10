import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "must provide task name"],
        trim: true,
        maxlength: [20, "name cannot be longer than 20 characters"]
    },
    completed: {
        type: Boolean,
        default: false
    }
})

export default mongoose.model('Task', taskSchema);