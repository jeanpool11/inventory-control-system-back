const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateRegisterSupplier = [
  check("name").exists().notEmpty(),
  check("phone").exists().notEmpty().isNumeric(),
  check("email").exists().notEmpty().isEmail(),
  check("address").exists().notEmpty(),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateRegisterSupplier };
