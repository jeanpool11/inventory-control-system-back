const express = require("express");
const router = express.Router();
const { loginCtrl } = require("../controllers/authController");
const { validateLogin } = require("../validators/authValidators");




router.post("/login", validateLogin, loginCtrl);

module.exports = router;