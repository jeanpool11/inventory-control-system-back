const { check, body } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const mongoose = require("mongoose");

const validateRegisterProduct = [
  check("code")
    .exists().withMessage("El código es obligatorio.")
    .notEmpty().withMessage("El código no debe estar vacío.")
    .isString().withMessage("El código debe ser una cadena de texto."),

  check("name")
    .exists().notEmpty().withMessage("El nombre es obligatorio."),

  check("description")
    .exists().notEmpty().withMessage("La descripción es obligatoria."),

  check("price")
    .exists().withMessage("El precio es obligatorio.")
    .notEmpty().withMessage("El precio no debe estar vacío.")
    .isNumeric().withMessage("El precio debe ser un número."),

  check("stock")
    .exists().withMessage("El stock es obligatorio.")
    .notEmpty().withMessage("El stock no debe estar vacío.")
    .isInt({ min: 0 }).withMessage("El stock debe ser un número entero mayor o igual a 0."),

  check("minStock")
    .exists().withMessage("El stock mínimo es obligatorio.")
    .notEmpty().withMessage("El stock mínimo no debe estar vacío.")
    .isInt({ min: 0 }).withMessage("El stock mínimo debe ser un número entero mayor o igual a 0."),

  check("maxStock")
    .exists().withMessage("El stock máximo es obligatorio.")
    .notEmpty().withMessage("El stock máximo no debe estar vacío.")
    .isInt({ min: 0 }).withMessage("El stock máximo debe ser un número entero mayor o igual a 0."),

  // Validación cruzada: maxStock debe ser mayor o igual que minStock
  body().custom((body) => {
    if (body.minStock > body.maxStock) {
      throw new Error("El stock máximo debe ser mayor o igual al stock mínimo.");
    }
    return true;
  }),

  check("supplier")
    .exists().withMessage("El proveedor es obligatorio.")
    .notEmpty().withMessage("El proveedor no debe estar vacío.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("El ID de proveedor no es válido."),

  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateRegisterProduct };
