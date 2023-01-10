const mongoose = require('mongoose');
const constants = require('./constants');

const allArtists = mongoose.Schema({
    artistid: {
        type: String,
        req: true,
    },
    name: {
        type: String,
        req: true,
    },
    image: {
        type: String,
        req: true,
    },
    follower_count: {
        type: Number,
        req: true,
    },
    is_followed: {
        type: Boolean,
        req: true,
    },
    perma_url: {
        type: String,
        req: true,
    },
})
module.exports = mongoose.model(constants.artists, allArtists);