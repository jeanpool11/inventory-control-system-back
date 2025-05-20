const { verifyToken } = require('../utils/handleToken');

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.cookies?.token;

    if (!token) return res.status(401).json({ error: 'NO_TOKEN_PROVIDED' });

    const decoded = await verifyToken(token);
    if (!decoded) return res.status(401).json({ error: 'INVALID_TOKEN' });

    req.user = decoded;
    next();
  } catch (e) {
    console.error('AUTH ERROR', e);
    res.status(500).json({ error: 'INTERNAL_ERROR' });
  }
};

module.exports = authMiddleware;
