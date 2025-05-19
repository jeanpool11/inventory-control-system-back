const { matchedData } = require('express-validator');
const { handleErrorResponse } = require('../utils/handleError');
const AuthService = require('../services/authService');

const loginCtrl = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    const { token, user } = await AuthService.loginUser(email, password);

    res.send({ data: { token, user } });
  } catch (e) {
    if (e.message === 'USER_NOT_EXISTS') return handleErrorResponse(res, e.message, 404);
    if (e.message === 'PASSWORD_INVALID') return handleErrorResponse(res, e.message, 402);
    console.error('LOGIN ERROR:', e);
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
};

module.exports = { loginCtrl };
