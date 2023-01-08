const express = require("express");
const userModel = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

const registerUser = async (req, res) => {
  //token gen
  const { fullName, email, confirmPassword } = req.body;
  try {
    // checking existinguser
    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({
        message: "user already exists",
      });
    }
    //genratng hashed password
    const hashedPassword = await bcrypt.hash(confirmPassword, 10);

    // creating  user
    const createUser = await userModel.create({
      fullName: fullName,
      email: email,
      password: hashedPassword,
    });
    //token genrating
    const token = jwt.sign(
      { email: createUser.email, id: createUser._id },
      SECRET_KEY
    );
    const { password, ...result } = createUser._doc;
    return res.status(201).json({
      token: token,
      data: result,
    });
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
