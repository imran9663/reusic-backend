const mongoose = require('mongoose');
const constants = require('./constants');

const MusicSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.user,
        require: true
    },
    data: {
        type: Array,
        require: true
    }
}, { timestamps: true })
module.exports = mongoose.model(constants.music, MusicSchema);