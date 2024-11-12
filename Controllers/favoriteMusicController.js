const FavoriteModel = require('../models/favorites');
const getFavoriteTracks = async (req, res) => {
    const { userId } = req.params;
    try {
        const getFavoriteTracksData = await FavoriteModel.findOne({ userId: userId });
        if (getFavoriteTracksData) {
            return res.status(200).json({ msg: 'SUCCESS', data: getFavoriteTracksData.data });
        }
        return res.status(201).json({ msg: 'No Data Found', data: [] });
    } catch (error) {
        return res.status(500).json({ msg: 'Something  went Wrong' });
    }
}

const addToFavoriteTracks = async (req, res) => {
    const { userId } = req;
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
            const { data } = req.body
            const newList = new FavoriteModel({
                userId: userId,
                data: [data],
            })
            const addnewList = await newList.save()
            return res.status(201).json({ msg: 'New Track Added to Favorites' });
        }

    } catch (error) {
        console.log("addToFavoriteTracks error==>", error);
        return res.status(500).json({ msg: 'Something  went Wrong' });
    }
}
const removeFromFavorites = async (req, res) => {
    const { userId } = req;
    const { songId } = req.params
    try {
        const getFavoriteTracksData = await FavoriteModel.findOne({ userId: userId });
        if (getFavoriteTracksData?.data) {
            const newData = getFavoriteTracksData.data.filter(val => val.id !== songId)
            await FavoriteModel.updateOne({ userId: userId }, { data: newData })
            return res.status(200).json({ msg: 'removed the song', newData });
        }
        else {
            return res.status(201).json({ msg: 'no Favorites Found' });
        }
    } catch (error) {
        console.log("getFavoriteTracksData err==>", error);
        return res.status(500).json({ msg: 'Something  went Wrong' });
    }
}

module.exports = { getFavoriteTracks, removeFromFavorites, addToFavoriteTracks };