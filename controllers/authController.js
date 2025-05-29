const { matchedData } = require('express-validator');
const { handleErrorResponse, handleHttpError } = require('../utils/handleError');
const { setTokenCookie } = require('../utils/handleCookie');
const AuthService = require('../services/authService');

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = matchedData(req);
    const { token, user } = await AuthService.loginUser(email, password);

    setTokenCookie(res, token);

    res.send({ data: { user } });
  } catch (e) {
    if (e.message === 'USER_NOT_EXISTS') return handleErrorResponse(res, e.message, 404);
    if (e.message === 'PASSWORD_INVALID') return handleErrorResponse(res, e.message, 402);

    handleHttpError(res, e); // ✅ Manejo general de errores consistente
  }
};

const checkAuthCtrl = async (req, res) => {
  try {
    // Si el middleware authMiddleware pasó, el usuario está autenticado
    res.send({ 
      data: {
        user: req.user, // Info del usuario decodificada del token
        authenticated: true
      }
    });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const logoutCtrl = (req, res) => {
  // Eliminar la cookie del token
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });

  // Respuesta exitosa
  res.status(200).json({ 
    message: 'Logout exitoso',
    data: null
  });
};

module.exports = { loginCtrl, checkAuthCtrl, logoutCtrl };
