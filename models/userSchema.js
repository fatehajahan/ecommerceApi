const mongoose = require("mongoose")
const { Schema } = mongoose

const userSchema = new Schema({
    firstName: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    lastName: {
        type: String,
        require: true,
        lowercase: true,
        trim: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    otp: {
        type: String
    },
    expiredOtp: {
        type: Date,
        default: Date.now
    },
    isVarified: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model("UserList", userSchema)