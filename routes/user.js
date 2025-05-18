const express = require("express");
const router = express.Router();
const { createUser, getUsers, hardDeleteUser, softDeleteUser, updateUser } = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidators");


router.post("/create", validateRegisterUser, createUser);         // Crear
router.get("/list", getUsers);                                      // Listar activos
router.put("/update/:id", validateRegisterUser, updateUser);      // Actualizar
router.delete("/delete/:id", softDeleteUser);                       // Eliminar lógica
router.delete("/delete-hard/:id", hardDeleteUser);                  // Eliminar física

module.exports = router;