const { matchedData } = require('express-validator');
const { handleErrorResponse, handleHttpError } = require('../utils/handleError');
const UserService = require('../services/userService');

const createUser = async (req, res) => {
  try {
    const body = matchedData(req);
    const user = await UserService.createUser(body);
    return res.status(201).json({ data: user });
  } catch (e) {
    if (e.message === 'USER_EXISTS') return handleErrorResponse(res, 'USER_EXISTS', 409);
    handleHttpError(res, e);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);
    const user = await UserService.updateUser(id, body);
    return res.json({ message: 'Usuario actualizado', data: user });
  } catch (e) {
    if (e.message === 'USER_NOT_FOUND') return handleErrorResponse(res, 'USER_NOT_FOUND', 404);
    handleHttpError(res, e);
  }
};

const getUsers = async (_req, res) => {
  try {
    const data = await UserService.getActiveUsers();
    return res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const softDeleteUser = async (req, res) => {
  try {
    await UserService.softDeleteUser(req.params.id);
    return res.json({ message: 'User eliminado lógicamente' });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const hardDeleteUser = async (req, res) => {
  try {
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
