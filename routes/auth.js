// routes/auth.js
const express = require('express');
const router  = express.Router();
const { loginCtrl }     = require('../controllers/authController');
const { validateLogin } = require('../validators/authValidators');

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Inicia sesión y devuelve un JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email, password]
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 format: password
 *                 example: MiPass123!
 *     responses:
 *       200:
 *         description: Autenticación exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       description: JWT Bearer token
 *                       example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9…
 *                     user:
 *                       type: object
 *                       properties:
 *                         _id:
 *                           type: string
 *                           example: 664c9e5f5a4d2b0f3db29a15
 *                         name:
 *                           type: string
 *                           example: Admin
 *                         email:
 *                           type: string
 *                           example: admin@example.com
 *                         role:
 *                           type: string
 *                           example: admin
 *       402:
 *         description: Contraseña inválida
 *       404:
 *         description: Usuario no existe
 */
router.post('/login', validateLogin, loginCtrl);

module.exports = router;
