const { verifyToken } = require('../utils/handleToken');
const { throwError, handleError, NO_TOKEN_PROVIDED, INVALID_TOKEN } = require('../errors');

const authMiddleware = async (req, res, next) => {
  try {
      const token = req.cookies?.token;
      if (!token) throwError(NO_TOKEN_PROVIDED);

      const decoded = await verifyToken(token);
      if (!decoded) throwError(INVALID_TOKEN);

      req.user = decoded;
      next();
  } catch (e) {
      handleError(res, e);
  }
};
module.exports = authMiddleware;
