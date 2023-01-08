const FavoriteModel = require('../models/favorites');



const getFavoriteTracks = async (req, res) => {
    const { userId } = req;
    console.log("userId", userId);
    try {
        const getFavoriteTracksData = await FavoriteModel.findOne({ userId: userId });
        console.log("getFavoriteTracksData", getFavoriteTracksData.userId);
        if (getFavoriteTracksData) {
            return res.status(200).json({ msg: 'SUCCESS', data: getFavoriteTracksData.data });
        }
        return res.status(200).json({ msg: 'No Data Found', data: [] });
    } catch (error) {
        return res.status(500).json({ msg: 'someting went worng' });
    }
}

const addToFavoriteTracks = async (req, res) => {
    const { userId } = req
    try {
        const getFavoriteTracksData = await FavoriteModel.findOne({ userId: userId })
        if (getFavoriteTracksData?.data) {
            const { data } = getFavoriteTracksData;
            const findTrack = data?.some(val => val.id === req.body.data.id)
            if (findTrack) {
                return res.status(200).json({ msg: 'Track already Added to Favorites' });
            } else {
                const result = await FavoriteModel.updateOne({ userId: userId }, { data: [...data, req.body.data] });
                return res.status(200).json({ msg: 'Added to Favorites' });
            }
        } else {
            console.log();
            const { data } = req.body
            console.log("addmusic data", data);
            const newList = new FavoriteModel({
                userId: userId,
                data: [data],
            })
            const addnewList = await newList.save()
            return res.status(201).json({ msg: 'New Track Added to Favorites' });
        }

    } catch (error) {
        console.log("addToFavoriteTracks error==>", error);
        return res.status(500).json({ msg: 'someting went worng' });
    }
}

module.exports = { getFavoriteTracks, addToFavoriteTracks };