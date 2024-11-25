const PlayListModel = require("../models/playList");

const getAllPlayListsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const allPlayList = await PlayListModel.findOne({ userId: userId });
        if (allPlayList !== null) {
            return res
                .status(200)
                .json({ msg: "Success", data: allPlayList });
        } else {
            return res.status(404).json({ msg: "No Data Found" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong" });
    }
};
const getPlayListsByPlayListId = async (req, res) => {
    const { playlistId } = req.params;
    try {
        const allPlayList = await PlayListModel.findOne(
            { "playlists.playlistId": playlistId },
            { "playlists.$": 1, createdBy: 1, createdAt: 1, userId: 1 }
        );
        if (allPlayList !== null) {
            return res
                .status(200)
                .json({ msg: "Success", data: allPlayList });
        } else {
            return res.status(404).json({ msg: "No Data Found" });
        }
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong" });
    }
};
const createPlayListByUser = async (req, res) => {
    const { userId, createdBy, playListName, playListData } = req.body;
    const playlist = { playListName, playListData };
    try {
        const addPlaylist = await PlayListModel.updateOne(
            { userId },
            {
                createdBy: createdBy,
                $push: { playlists: playlist },
            },
            { upsert: true }
        );
        if (!addPlaylist) {
            return res.status(400).json({ msg: "unable to add new playlist " });
        }
        return res.status(200).json({ msg: "data added Success" });
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong ❌", error });
    }
};
const addTrackToThePlayListById = async (req, res) => {
    const { userId, playlistId, trackData } = req.body;
    try {
        const updatePlayList = await PlayListModel.findOneAndUpdate(
            { userId: userId, "playlists.playlistId": playlistId },
            { $push: { "playlists.$.playListData": trackData } }
        );
        if (!updatePlayList) {
            return res.status(400).json({ msg: "❌ Failed to add in Playlist" });
        }
        return res.status(200).json({ msg: " ✔ Track added to PlayList" });
    } catch (error) {
        console.log("updatePlayList error=>", error);
        return res
            .status(500)
            .json({ msg: "something went wrong ❌", error: error });
    }
};
const removeTrackFromPlaylistByTrackId = async (req, res) => {
    const { userId, playlistId, trackId } = req.body;
    try {
        const deleteTrack = await PlayListModel.findOneAndUpdate(
            { userId, "playlists.playlistId": playlistId },
            { $pull: { "playlists.$.playListData": { id: trackId } } }
        );
        if (!deleteTrack) {
            return res
                .status(400)
                .json({ msg: "❌ Failed to Remove Track From Playlist" });
        }
        return res.status(200).json({ msg: "Track removed from Playlist " });
    } catch (error) {
        return res.status(500).json({ msg: "something went wrong ❌", error });
    }
};
const deletePlayListByPlayListId = async (req, res) => {
    const { userId, playlistId } = req.body;
    try {
        const removePlaylist = await PlayListModel.findOneAndUpdate(
            { userId: userId },
            {
                $pull: { playlists: { playlistId: playlistId } },
            }
        );
        console.log("removePlaylist", removePlaylist);

        if (removePlaylist === null) {
            return res.status(400).json({ msg: "Error while removing play list" });
        }
        return res.status(200).json({ msg: "Playlist removed Success" });
    } catch (error) {
        console.log("deletePlayListByPlayListId error ==>", error);
        return res.status(500).json({ msg: "something went wrong ❌", error });
    }
};
module.exports = {
    getAllPlayListsByUser,
    createPlayListByUser,
    addTrackToThePlayListById,
    removeTrackFromPlaylistByTrackId,
    deletePlayListByPlayListId,
    getPlayListsByPlayListId,
};
