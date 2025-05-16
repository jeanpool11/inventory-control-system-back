const express = require("express");
const router = express.Router();

const {
  createOperation,
  getOperations
} = require("../controllers/operationController");

const { validateRegisterOperation } = require("../validators/operationValidators");

// Crear operación (pedido o devolución)
router.post("/create", validateRegisterOperation, createOperation);

// Listar todas las operaciones (tipo kardex)
router.get("/list", getOperations);

module.exports = router;
