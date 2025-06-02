/**
 * Establece la cookie del token JWT en la respuesta.
 * @param {object} res - Objeto response de Express.
 * @param {string} token - Token JWT.
 */
const setTokenCookie = (res, token) => {
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      maxAge: 1000 * 60 * 60 * 2, // 2 horas
    });
  };
  
  module.exports = { setTokenCookie };
  