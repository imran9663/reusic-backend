const UserModel = require("../models/user");

const setLanguage = async (req, res) => {
    const { userId } = req;
    const { languages } = req.body;
    try {
        const profileInfo = await UserModel.findOneAndUpdate(
            { userId: userId },
            { $set: { language: languages } },
            { returnOriginal: false }
        );
        if (profileInfo) {
            const { password, ...rest } = profileInfo._doc
            return res.status(200).json({ msg: "data added Success", data: rest });
        }
        return res.status(500).json({ msg: 'someting went worng' });
    } catch (error) {
        return res.status(500).json({ msg: "someting went worng" });
    }
};

module.exports = { setLanguage };
