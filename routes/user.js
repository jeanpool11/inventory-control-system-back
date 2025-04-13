const express = require("express");
const router = express.Router();
const { createSeller, getSellers, hardDeleteSeller, softDeleteSeller, updateSeller } = require("../controllers/userController");
const { validateRegisterSeller } = require("../validators/userValidators");

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
router.post("/create", validateRegisterSeller, createSeller);         // Crear
router.get("/list", getSellers);                                      // Listar activos
router.put("/update/:id", validateRegisterSeller, updateSeller);      // Actualizar
router.delete("/delete/:id", softDeleteSeller);                       // Eliminar lógica
router.delete("/delete-hard/:id", hardDeleteSeller);                  // Eliminar física

module.exports = router;