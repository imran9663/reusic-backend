const MusicModel = require("../models/music")
const getRecentMusic = async (req, res) => {
    const { userId } = req
    try {
        const getRecentMusicData = await MusicModel.findOne({ userId: userId })
        if (getRecentMusicData?.data) {
            return res.status(200).json({ msg: 'SUCCESS', data: getRecentMusicData.data })
        } else {
            return res.status(200).json({ msg: 'no data found', data: [] })
        }
    } catch (error) {
        return res.status(500).json({ msg: 'Something  went Wrong' });
    }
}

const addToRecentMusic = async (req, res) => {
    const { userId } = req
    try {
        const getRecentMusicData = await MusicModel.findOne({ userId: userId })
        if (getRecentMusicData?.data) {
            const { data } = getRecentMusicData;
            const findTrack = data?.some(val => val?.id === req.body.data?.id)
            if (findTrack) {
                return res.status(200).json({ msg: 'Track already Present' });
            } else {
                const result = await MusicModel.updateOne({ userId: userId }, { data: [...data, req.body.data] });
                return res.status(200).json({ msg: 'data added Success' });
            }
        } else {
            const { data } = req.body
            const newList = new MusicModel({
                userId: userId,
                data: [data],
            })
            const addnewList = await newList.save()
            return res.status(201).json({ msg: 'data added Success' });
        }

    } catch (error) {
        console.log("error", error);
        return res.status(500).json({ msg: 'Something  went Wrong' });
    }


}

module.exports = { getRecentMusic, addToRecentMusic };