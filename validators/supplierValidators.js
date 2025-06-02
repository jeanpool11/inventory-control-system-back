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

const validateUpdateSupplier = [
  check("name").optional().notEmpty(),
  check("phone").optional().notEmpty(),
  check("email").optional().notEmpty().isEmail(),
  check("address").optional().notEmpty(),
  check("ruc").optional().notEmpty().isString().isLength({ min: 11, max: 11 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateRegisterSupplier, validateUpdateSupplier };