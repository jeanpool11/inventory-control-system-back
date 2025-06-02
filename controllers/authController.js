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

    handleHttpError(res, e);
  }
};

const checkAuthCtrl = async (req, res) => {
  try {
    const user = await AuthService.getUserFromToken(req.user._id);

    if (!user) {
      return res.status(401).send({ data: { authenticated: false } });
    }

    res.send({
      data: {
        user,
        authenticated: true
      }
    });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const logoutCtrl = (req, res) => {
  res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'Strict'
  });

  res.status(200).json({ 
    message: 'Logout exitoso',
    data: null
  });
};

module.exports = { loginCtrl, checkAuthCtrl, logoutCtrl };