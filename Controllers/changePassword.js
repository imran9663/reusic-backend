const jwt = require('jsonwebtoken');
const UserModel = require('../models/user');
const bcrypt = require('bcrypt');



const changePassword = async (req, res) => {
    const { token, newPassword } = req.body;
    const result = jwt.verify(token, process.env.SECRET_KEY);
    const { email } = result;
    try {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updateuser = await UserModel.updateOne({ email: email }, { password: hashedPassword })
        return res.status(200).json({ msg: 'Password update success' });
    } catch (error) {
        console.log("changePassword error ==>", error);
        return res.status(500).json({ msg: 'someting went worng' });
    }
}
module.exports = { changePassword }