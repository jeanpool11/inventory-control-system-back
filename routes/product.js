// routes/product.js
const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  getAllProducts,
  updateProduct,
  softDeleteProduct,
  hardDeleteProduct,
  restoreProduct
} = require("../controllers/productController");

const {
  validateRegisterProduct,
  validateUpdateProduct
} = require("../validators/productValidators");

const authMiddleware = require("../middlewares/authMiddleware");

// Crear producto
router.post("/create", authMiddleware, validateRegisterProduct, createProduct);

// Listar productos activos
router.get("/list", authMiddleware, getProducts);

// Listar todos los productos (activos + eliminados)
router.get("/list-all", authMiddleware, getAllProducts); // ← NUEVA RUTA

// Actualizar producto
router.put("/update/:id", authMiddleware, validateUpdateProduct, updateProduct);

// Eliminación lógica
router.delete("/delete/:id", authMiddleware, softDeleteProduct);

// Eliminación física
router.delete("/delete-hard/:id", authMiddleware, hardDeleteProduct);

// Restaurar producto
router.put("/restore/:id", authMiddleware, restoreProduct);

module.exports = router;
