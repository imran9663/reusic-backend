const express = require("express");
const { registerUser, signinUser } = require("../Controllers/userController");
const { verifyOtp } = require("../Controllers/verifyOtp");
const { changePassword } = require("../Controllers/changePassword");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signinUser);
router.post("/verifyOtp", verifyOtp);
router.post("/changePassword", changePassword);
module.exports = router;
