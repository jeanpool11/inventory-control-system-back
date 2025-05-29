const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateRegisterSupplier = [
  check("name").exists().notEmpty(),
  check("phone").exists().notEmpty(),
  check("email").exists().notEmpty().isEmail(),
  check("address").exists().notEmpty(),
  check("ruc").exists().notEmpty().isString().isLength({ min: 11, max: 11 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateRegisterSupplier };
