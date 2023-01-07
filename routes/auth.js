const express = require("express");
const { registerUser, signinUser } = require("../Controllers/userController");
const router = express.Router();


router.post("/register", registerUser);
router.post("/login", signinUser);
module.exports = router;
