const express = require("express");
const router = express.Router();
const { createSupplier, getSuppliers, hardDeleteSupplier, softDeleteSupplier, updateSupplier} = require("../controllers/supplierController");
const { validateRegisterSupplier } = require("../validators/supplierValidators");

router.post("/create", validateRegisterSupplier, createSupplier);         // Crear
router.get("/list", getSuppliers);                                      // Listar activos
router.put("/update/:id", validateRegisterSupplier, updateSupplier);      // Actualizar
router.delete("/delete/:id", softDeleteSupplier);                       // Eliminar lógica
router.delete("/delete-hard/:id", hardDeleteSupplier);                  // Eliminar física

module.exports = router;