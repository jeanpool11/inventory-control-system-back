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

module.exports = { loginCtrl };
