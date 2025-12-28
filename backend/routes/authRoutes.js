const express = require("express");

const { login, signUp } = require("../controller/authController");

const router = express.Router();
router.post("/login", login);
router.post("/register", signUp);
module.exports = router;
