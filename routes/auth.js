const express = require("express");
const { registerUser, signinUser } = require("../Controllers/userController");
const { verifyOtp } = require("../Controllers/verifyOtp");
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", signinUser);
router.post("/verifyOtp", verifyOtp);
module.exports = router;
