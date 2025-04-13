const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateRegisterSeller = [
  check("name").exists().notEmpty(),
  check("phone").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 15 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateRegisterSeller };
