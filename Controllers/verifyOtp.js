
const OtpModel = require('../models/otp');
const UserModel = require('../models/user');

const verifyOtp = async (req, res) => {
    const { otp, email } = req.body
    try {
        const getOtpFromDb = await OtpModel.findOne({ email: email })
        if (getOtpFromDb) {
            if (getOtpFromDb.otp === otp) {
                await UserModel.updateOne({ email: email }, { verified: true })
                await OtpModel.findOneAndDelete({ email: email })
                return res.status(200).json({ msg: 'Otp verificstion Scuccess' });
            }
            return res.status(400).json({ msg: 'invalid OTP' });
        }
        return res.status(404).json({ msg: 'otp not found or it might have expired' });
    } catch (error) {
        console.log("verifyOtp error==>", error);
        return res.status(500).json({ msg: 'someting went worng' });
    }
}
module.exports = { verifyOtp };