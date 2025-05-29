const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");

const validateRegisterUser = [
  check("name").exists().notEmpty(),
  check("phone").exists().notEmpty().isString(),
  check("email").exists().notEmpty().isEmail(),
  check("password").exists().notEmpty().isLength({ min: 8, max: 15 }),
  (req, res, next) => validateResult(req, res, next),
];

const validateUpdateUser = [
  check("name").optional().notEmpty(),
  check("phone").optional().notEmpty().isString(),
  check("email").optional().notEmpty().isEmail(),
  check("password")
    .optional()
    .notEmpty()
    .isLength({ min: 8, max: 15 }),
  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateRegisterUser, validateUpdateUser };
