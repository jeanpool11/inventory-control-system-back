const { matchedData } = require('express-validator');
const { handleErrorResponse, handleHttpError } = require('../utils/handleError');
const UserService = require('../services/userService');

// Solo admins pueden crear usuarios
const createUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return handleErrorResponse(res, 'NOT_ALLOWED', 403);
    }

    const body = matchedData(req);
    const user = await UserService.createUser(body);
    return res.status(201).json({ data: user });
  } catch (e) {
    if (e.message === 'USER_EXISTS') return handleErrorResponse(res, 'USER_EXISTS', 409);
    handleHttpError(res, e);
  }
};

// Admins pueden actualizar
const updateUser = async (req, res) => {
  try {

    if (req.user.role !== 'admin') {
      return handleErrorResponse(res, 'NOT_ALLOWED', 403);
    }

    const body = matchedData(req);
    const user = await UserService.updateUser(id, body);
    return res.json({ message: 'Usuario actualizado', data: user });
  } catch (e) {
    if (e.message === 'USER_NOT_FOUND') return handleErrorResponse(res, 'USER_NOT_FOUND', 404);
    handleHttpError(res, e);
  }
};

// Solo admins pueden ver todos los usuarios activos
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return handleErrorResponse(res, 'NOT_ALLOWED', 403);
    }

    const data = await UserService.getActiveUsers();
    return res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Solo admins pueden hacer borrado lógico
const softDeleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return handleErrorResponse(res, 'NOT_ALLOWED', 403);
    }

    await UserService.softDeleteUser(req.params.id);
    return res.json({ message: 'User eliminado lógicamente' });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Solo admins pueden hacer borrado físico
const hardDeleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      return handleErrorResponse(res, 'NOT_ALLOWED', 403);
    }

    await UserService.hardDeleteUser(req.params.id);
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
