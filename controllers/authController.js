const { matchedData } = require('express-validator');
const { compare }     = require('../utils/handleJwt');
const { tokenSign }   = require('../utils/handleToken');
const { handleErrorResponse } = require('../utils/handleError');

const UserDao = require('../daos/userDao');     // ← usamos DAO directo

/**
 * Controller for login
 * @param {*} req
 * @param {*} res
 * @returns
 */


const loginCtrl = async (req, res) => {
  try {
    const { email, password } = matchedData(req);

    // 1. Buscar usuario
    const user = await UserDao.findByEmail(email);
    if (!user) return handleErrorResponse(res, 'USER_NOT_EXISTS', 404);

    // 2. Comparar contraseña
    const ok = await compare(password, user.password);
    if (!ok)   return handleErrorResponse(res, 'PASSWORD_INVALID', 402);

    // 3. Generar token
    const token = await tokenSign(user);

    res.send({ data: { token, user } });
  } catch (e) {
    console.error('LOGIN ERROR:', e);
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
};



module.exports = { loginCtrl };