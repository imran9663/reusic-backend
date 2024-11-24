const UserModel = require('../models/user');
const OtpModel = require('../models/otp');
const { mailer } = require('../utils/mailer');
const { otpHtml } = require('../utils/otpHtml');
const ForgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        const isExistingUser = await UserModel.findOne({ email: email });
        if (isExistingUser) {
            //gen OTP
            let OTP = Math.floor(1000 + Math.random() * 9000)
            //genrate HTML
            const html = otpHtml(OTP)
            const subject = "OTP verification for Forgot Password";
            const text = `Hi  your OTP for forgot password Request is - ${OTP} for  ${email}`
            //sending mail
            const nodeMailer = await mailer(email, subject, text, html);
            if (nodeMailer?.messageId) {
                //storing otp to DB
                const otpResult = await OtpModel.findOneAndUpdate({ email: email }, {
                    email: email,
                    otp: OTP,
                }, { upsert: true });
                if (otpResult) {
                    return res.status(201).json({ msg: 'Otp sent Success' });
                }
            }
            return res.status(500).json({ msg: 'Something  went Wrong while sending OTP' });
        }
        return res.status(400).json({ msg: 'Email is not registered' });
    } catch (error) {
        console.log("ForgotPassword Error==>", error);
        return res.status(500).json({ msg: 'Something  went Wrong' });
    }
}
module.exports = { ForgotPassword };