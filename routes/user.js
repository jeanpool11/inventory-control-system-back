const express = require("express");
const router = express.Router();
const {
  createUser,
  getUsers,
  getAllUsers,
  updateUser,
  softDeleteUser,
  hardDeleteUser,
  restoreUser
} = require("../controllers/userController");
const { validateRegisterUser, validateUpdateUser } = require("../validators/userValidators");
const authMiddleware = require('../middlewares/authMiddleware');

router.post("/create", authMiddleware, validateRegisterUser, createUser);
router.get("/list", authMiddleware, getUsers);           // Lista de activos
router.get("/list-all", authMiddleware, getAllUsers);    // Lista completa
router.put("/update/:id", authMiddleware, validateUpdateUser, updateUser);
router.delete("/delete/:id", authMiddleware, softDeleteUser);
router.delete("/delete-hard/:id", authMiddleware, hardDeleteUser);
router.put("/restore/:id", authMiddleware, restoreUser);

module.exports = router;
