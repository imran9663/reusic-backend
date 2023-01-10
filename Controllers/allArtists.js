const AllArtist = require("../models/allArtists");

const getAllArtists = async (req, res) => {
    const { page = 1, limit = 5 } = req.query;
    try {
        const artists = await AllArtist.find()
            .limit(limit * 1)
            .skip((page - 1) * limit);
        return res
            .status(200)
            .json({ msg: "data added Success", data: artists });
    } catch (error) {
        return res.status(500).json({ msg: "someting went worng" });
    }
};
const addToAllArtists = async (req, res) => {
    const { data } = req.body;
    if (data.length > 0) {
        try {
            data.map(item => {
                AllArtist.create({
                    artistid: item.artistid,
                    name: item.name,
                    image: item.image,
                    follower_count: item.follower_count,
                    is_followed: item.is_followed,
                    perma_url: item.perma_url,
                });
            })
            return res.status(200).json({ msg: "data added Success" });
        } catch (error) {
            console.log("addtoArtist->if->error", error);
            return res.status(500).json({ msg: "someting went worng" });
        }
    }
    else {
        try {
            await AllArtist.create({
                artistid: item.artistid,
                name: item.name,
                image: item.image,
                follower_count: item.follower_count,
                is_followed: item.is_followed,
                perma_url: item.perma_url,
            });
            return res.status(200).json({ msg: "Artist added Success" });
        } catch (error) {
            console.log("addtoArtist->else->error", error);
            return res.status(500).json({ msg: "someting went worng" });
        }
    }

};
module.exports = { getAllArtists, addToAllArtists };
