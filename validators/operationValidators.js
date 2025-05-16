const { check } = require("express-validator");
const { validateResult } = require("../utils/handleValidator");
const mongoose = require("mongoose");

const validateRegisterOperation = [
  check("type")
    .exists().withMessage("El tipo de operación es obligatorio.")
    .notEmpty().withMessage("El tipo de operación no debe estar vacío.")
    .isIn(["pedido", "devolucion"]).withMessage("El tipo de operación debe ser 'pedido' o 'devolucion'."),

  check("product")
    .exists().withMessage("El producto es obligatorio.")
    .notEmpty().withMessage("El producto no debe estar vacío.")
    .custom((value) => mongoose.Types.ObjectId.isValid(value)).withMessage("El ID de producto no es válido."),

  check("quantity")
    .exists().withMessage("La cantidad es obligatoria.")
    .notEmpty().withMessage("La cantidad no debe estar vacía.")
    .isInt({ min: 1 }).withMessage("La cantidad debe ser un número entero mayor o igual a 1."),

  check("description")
    .exists().withMessage("La descripción es obligatoria.")
    .notEmpty().withMessage("La descripción no debe estar vacía.")
    .isString().withMessage("La descripción debe ser una cadena de texto."),

  (req, res, next) => validateResult(req, res, next),
];

module.exports = { validateRegisterOperation };
