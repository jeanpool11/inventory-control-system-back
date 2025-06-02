const express = require("express");
const router = express.Router();
const {
  createSupplier,
  getSuppliers,
  getAllSuppliers,
  updateSupplier,
  softDeleteSupplier,
  hardDeleteSupplier,
  restoreSupplier
} = require("../controllers/supplierController");
const {
  validateRegisterSupplier,
  validateUpdateSupplier
} = require("../validators/supplierValidators");
const authMiddleware = require("../middlewares/authMiddleware");

router.post("/create", authMiddleware, validateRegisterSupplier, createSupplier);
router.get("/list", authMiddleware, getSuppliers);
router.get("/list-all", authMiddleware, getAllSuppliers); 
router.put("/update/:id", authMiddleware, validateUpdateSupplier, updateSupplier);
router.delete("/delete/:id", authMiddleware, softDeleteSupplier);
router.delete("/delete-hard/:id", authMiddleware, hardDeleteSupplier);
router.put("/restore/:id", authMiddleware, restoreSupplier);

module.exports = router;
