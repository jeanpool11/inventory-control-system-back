const express = require("express");
const router = express.Router();

const {
  createOperation,
  getOperations,
  deleteOperation,
  softDeleteOperation,
  restoreOperation,
  getAllOperations
} = require("../controllers/operationController");

const { validateRegisterOperation } = require("../validators/operationValidators");
const authMiddleware = require("../middlewares/authMiddleware");

// Crear operación (entrada o salida)
router.post("/create", authMiddleware, validateRegisterOperation, createOperation);

// Listar todas las operaciones (tipo kardex)
router.get("/list", authMiddleware, getOperations);

router.get("/list-all", authMiddleware, getAllOperations); // ← NUEVO


// Eliminación física
router.delete("/delete-hard/:id", authMiddleware, deleteOperation);

// Eliminación lógica
router.delete("/delete/:id", authMiddleware, softDeleteOperation);

// Restaurar operación eliminada lógicamente
router.put("/restore/:id", authMiddleware, restoreOperation);

module.exports = router;
