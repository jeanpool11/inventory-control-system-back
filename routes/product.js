const express = require("express");
const router = express.Router();

const {
  createProduct,
  getProducts,
  updateProduct,
  softDeleteProduct,
  hardDeleteProduct,
} = require("../controllers/productController");

const { validateRegisterProduct } = require("../validators/productValidators");

// Crear producto
router.post("/create", validateRegisterProduct, createProduct);

// Listar productos activos
router.get("/list", getProducts);

// Actualizar producto
router.put("/update/:id", validateRegisterProduct, updateProduct);

// Eliminación lógica
router.delete("/delete/:id", softDeleteProduct);

// Eliminación física
router.delete("/delete-hard/:id", hardDeleteProduct);

module.exports = router;
