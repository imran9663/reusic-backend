const mongoose = require('mongoose');
const constants = require('./constants');


const FavoriteSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.user,
        req: true
    },
    data: {
        type: Array,
        require: true,
    }
}, { timestamps: true })

module.exports = mongoose.model(constants.favorites, FavoriteSchema);
