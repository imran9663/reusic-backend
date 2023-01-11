const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { mailer } = require("../utils/mailer");
const OtpModel = require("../models/otp");
const { otpHtml } = require("../utils/otpHtml");
const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  //token gen
  const { fullName, email, Password } = req.body;
  try {
    // checking existinguser
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    //genratng hashed password
    const hashedPassword = await bcrypt.hash(Password, 10);

    // creating  user
    const createUser = await userModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
      verified: false
    });
    //creating valid Otp
    var OTP = Math.floor(1000 + Math.random() * 9000);
    const html = otpHtml(OTP)
    // sending otp to mail
    const node_mailer = await mailer(email, "OTP VERIFICATION", `hi your OTP - ${OTP} for  ${email}`, html)
    // saving the OTP to otpModel if the message id exists
    console.log("node_mailer?.messageId", node_mailer?.messageId);
    if (node_mailer?.messageId) {
      const createOtpObject = OtpModel.create({
        email: email,
        otp: OTP,
      })
      // const saveOtpObject = await createOtpObject.save()
      return res.status(201).json({
        msg: 'OTP sent to your Email id',

      });
    }
    else {
      return res.status(500).json({ msg: "someting went worng while sending the mail" });
    }
  } catch (error) {
    console.log("error ==>", error);
    return res.status(500).json({ msg: "someting went worng" });
  }
};





const signinUser = async (req, res) => {
  const { email, Password } = req.body;
  try {
    const existingUser = await userModel.findOne({ email: email });
    if (!existingUser) {
      return res.status(404).json({
        msg: "user not registerd",
      });
    }
    const macthPassword = await bcrypt.compare(Password, existingUser.password);
    if (!macthPassword) {
      return res.status(400).json({
        msg: "Invalid Credemtials",
      });
    }
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY
    );
    const { password, ...result } = existingUser._doc;
    return res.status(201).json({
      token: token,
      data: result,
    });
  } catch (error) {
    console.log("error ==>", error);
    return res.status(500).json({ msg: "someting went worng" });
  }
};

module.exports = { registerUser, signinUser };
