const express = require("express");
const router = express.Router();
const { createUser, getUsers, hardDeleteUser, softDeleteUser, updateUser } = require("../controllers/userController");
const { validateRegisterUser } = require("../validators/userValidators");

/**
 * Register new user
 * @swagger
 * /auth/register:
 *    post:
 *      tags:
 *        - auth
 *      summary: "Register user"
 *      description: Obtener la lista de canciones
 *      responses:
 *        '200':
 *          description: Retorna el objeto insertado en la coleccion.
 *        '422':
 *          description: Error de validacion.
 *      parameters:
 *        -  in: "path"
 *           name: "id"
 *           description: "ID track"
 *           required: true
 *           schema:
 *              type: string
 *    responses:
 *      '201':
 *        description: retorna el objeto insertado en la coleccion con stado '201'
 * 
 */
router.post("/create", validateRegisterUser, createUser);         // Crear
router.get("/list", getUsers);                                      // Listar activos
router.put("/update/:id", validateRegisterUser, updateUser);      // Actualizar
router.delete("/delete/:id", softDeleteUser);                       // Eliminar lógica
router.delete("/delete-hard/:id", hardDeleteUser);                  // Eliminar física

module.exports = router;