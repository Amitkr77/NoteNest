import mongoose from "mongoose";

const profileSchema = mongoose.Schema({
    name: {
        type: String,
        require: true,
        default: ''
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    }

}, { timestamps: true })

const profile = mongoose.model('Profile', profileSchema);
export default profile;