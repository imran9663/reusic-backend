const mongoose = require('mongoose');
const constants = require('./constants');
const Schema = mongoose.Schema

const OtpModel = new Schema({
    email: {
        type: String,
        require: true
    },
    otp: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now(),
        expires: 600 //10 min
    }
})
module.exports = mongoose.model(constants.otp, OtpModel);
