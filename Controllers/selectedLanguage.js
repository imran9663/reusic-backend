const UserModel = require("../models/user");

const setLanguage = async (req, res) => {
    const { languages, userId } = req.body;
    try {
        const profileInfo = await UserModel.findOneAndUpdate(
            { _id: userId },
            { $set: { language: languages } },
            { returnOriginal: false }
        );
        if (profileInfo) {
            const { password, ...rest } = profileInfo._doc
            return res.status(200).json({ msg: "data added Success", data: rest });
        }
        return res.status(500).json({ msg: 'something went Wrong' });
    } catch (error) {
        return res.status(500).json({ msg: "something went Wrong" });
    }
};

module.exports = { setLanguage };
