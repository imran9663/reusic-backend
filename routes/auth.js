const express = require("express");
const { registerUser, signinUser } = require("../Controllers/userController");
const { verifyOtp } = require("../Controllers/verifyOtp");
const { changePassword } = require("../Controllers/changePassword");
const { ForgotPassword } = require("../Controllers/forgotPassword");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signinUser);
router.post("/verifyOtp", verifyOtp);
router.post("/changePassword", changePassword);
router.post("/forgotpassword", ForgotPassword);
module.exports = router;
