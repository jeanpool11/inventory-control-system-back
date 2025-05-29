const { throwError, handleError, NOT_ALLOWED, INVALID_PARAMETERS, USER_EXISTS, USER_NOT_FOUND } = require('../errors');
const UserService = require('../services/userService');
const { matchedData } = require('express-validator');

// Solo admins pueden crear usuarios
const createUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throwError(NOT_ALLOWED);
    }

    const body = matchedData(req);
    const user = await UserService.createUser(body);
    res.status(201).json({ data: user });
  } catch (e) {
    handleError(res, e);
  }
};

// Solo admins pueden ver usuarios activos
const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throwError(NOT_ALLOWED);
    }

    // Parámetros
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search;

    // Validación
    if (page < 1 || limit < 1) {
      throwError(INVALID_PARAMETERS);
    }

    // Obtener usuarios
    const { data, totalPages, currentPage } = await UserService.getActiveUsers(page, limit, search);
    
    res.json({ data, totalPages, currentPage });
  } catch (e) {
    handleError(res, e);
  }
};

// Actualizar usuario
const updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throwError(NOT_ALLOWED);
    }

    const id = req.params.id;
    const body = matchedData(req);
    const user = await UserService.updateUser(id, body);
    res.json({ message: 'Usuario actualizado', data: user });
  } catch (e) {
    handleError(res, e);
  }
};

// Restaurar usuario eliminado
const restoreUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throwError(NOT_ALLOWED);
    }

    const user = await UserService.restoreUser(req.params.id);
    res.json({ message: 'Usuario reactivado', data: user });
  } catch (e) {
    handleError(res, e);
  }
};

// Borrado lógico
const softDeleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throwError(NOT_ALLOWED);
    }

    await UserService.softDeleteUser(req.params.id);
    res.json({ message: 'Usuario desactivado' });
  } catch (e) {
    handleError(res, e);
  }
};

// Borrado físico
const hardDeleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throwError(NOT_ALLOWED);
    }

    await UserService.hardDeleteUser(req.params.id);
    res.json({ message: 'Usuario eliminado permanentemente' });
  } catch (e) {
    handleError(res, e);
  }
};

// Obtener todos los usuarios (activos e inactivos)
const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') {
      throwError(NOT_ALLOWED);
    }

    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const search = req.query.search || '';
    const role = req.query.role || '';
    const sort = req.query.sort || 'createdAt';       // campo a ordenar
    const direction = req.query.direction || 'desc';  // dirección asc o desc

    if (page < 1 || limit < 1) {
      throwError(INVALID_PARAMETERS);
    }

    const { data, totalPages, currentPage } = await UserService.getAllUsers(
      page,
      limit,
      search,
      role,
      sort,
      direction
    );

    res.json({ data, totalPages, currentPage });
  } catch (e) {
    handleError(res, e);
  }
};

module.exports = {
  createUser,
  getUsers,
  updateUser,
  restoreUser,
  softDeleteUser,
  hardDeleteUser,
  getAllUsers
};