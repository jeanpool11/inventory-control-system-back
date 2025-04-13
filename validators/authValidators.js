const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");


const validateLogin = [
  check("email").exists().notEmpty(),
  check("password").exists().notEmpty(),
  (req, res, next) => {
    validateResult(req, res, next);
  },
];


module.exports = { validateLogin };