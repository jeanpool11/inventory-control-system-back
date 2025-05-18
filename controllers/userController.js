const { encrypt } = require('../utils/handleJwt');
const { matchedData } = require('express-validator');
const {
  handleErrorResponse,
  handleHttpError,
} = require('../utils/handleError');

const UserDao = require('../daos/userDao');          // ← DAO

/* ------------------------------------------------------------------ */
/*  Crear vendedor                                                    */
/* ------------------------------------------------------------------ */
const createUser = async (req, res) => {
  try {
    const body = matchedData(req);

    // 1. ¿Ya existe un usuario con ese e-mail?
    const exists = await UserDao.findByEmail(body.email);
    if (exists) return handleErrorResponse(res, 'USER_EXISTS', 409);

    // 2. Encriptar contraseña y forzar rol "seller"
    const password = await encrypt(body.password);
    const data = await UserDao.create({ ...body, password, role: 'seller' });

    return res.status(201).json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ------------------------------------------------------------------ */
/*  Actualizar vendedor                                               */
/* ------------------------------------------------------------------ */
const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);

    // No se permite cambiar el rol desde esta ruta
    if (body.role) delete body.role;

    // Si se actualiza la contraseña, encriptarla
    if (body.password) body.password = await encrypt(body.password);

    const data = await UserDao.updateById(id, body); // new: true en DAO
    if (!data) return handleErrorResponse(res, 'USER_NOT_FOUND', 404);

    return res.json({ message: 'Usuario actualizado', data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ------------------------------------------------------------------ */
/*  Listar vendedores activos                                         */
/* ------------------------------------------------------------------ */
const getUsers = async (_req, res) => {
  try {
    const data = await UserDao.findActive();         // excluye borrados
    return res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ------------------------------------------------------------------ */
/*  Eliminación lógica                                                */
/* ------------------------------------------------------------------ */
const softDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserDao.softDeleteById(id);
    return res.json({ message: 'User eliminado lógicamente' });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ------------------------------------------------------------------ */
/*  Eliminación física                                                */
/* ------------------------------------------------------------------ */
const hardDeleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    await UserDao.hardDeleteById(id);
    return res.json({ message: 'User eliminado permanentemente' });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = {
  createUser,
  updateUser,
  getUsers,
  softDeleteUser,
  hardDeleteUser,
};
