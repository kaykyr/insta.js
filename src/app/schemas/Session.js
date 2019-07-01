import mongoose from 'mongoose'

const SessionSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    session_data: {
        type: Array,
        required: true,
    },
    device: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
})

export default mongoose.model('Session', SessionSchema)