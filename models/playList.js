const mongoose = require('mongoose');
const constants = require('./constants');
const { v4: uuidv4 } = require('uuid');

const PlaylistSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: constants.playlist,
        req: true,
    },
    createdBy: {
        type: String
    },
    playlists: [{
        playlistId: {
            type: String,
            default: () => uuidv4().toString()
        },
        playListName: {
            type: String,
        },
        playListData: {
            type: Array,
        }
    }]

}, { timestamps: true });
module.exports = mongoose.model(constants.playlist, PlaylistSchema);