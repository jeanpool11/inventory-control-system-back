const { throwError, handleError, NOT_ALLOWED, USER_NOT_FOUND } = require('../errors');
const UserService = require('../services/userService');
const { matchedData } = require('express-validator');

const createUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const body = matchedData(req);
    const user = await UserService.createUser(body);
    res.status(201).json({ data: user });
  } catch (e) {
    handleError(res, e);
  }
};

const getUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const data = await UserService.getActiveUsers();
    res.json({ data });
  } catch (e) {
    handleError(res, e);
  }
};

const getAllUsers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const data = await UserService.getAllUsers();
    res.json({ data });
  } catch (e) {
    handleError(res, e);
  }
};

const updateUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const id = req.params.id;
    const body = matchedData(req);
    const user = await UserService.updateUser(id, body);
    res.json({ message: 'Usuario actualizado', data: user });
  } catch (e) {
    handleError(res, e);
  }
};

const restoreUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const user = await UserService.restoreUser(req.params.id);
    res.json({ message: 'Usuario reactivado', data: user });
  } catch (e) {
    handleError(res, e);
  }
};

const softDeleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    await UserService.softDeleteUser(req.params.id);
    res.json({ message: 'Usuario desactivado' });
  } catch (e) {
    handleError(res, e);
  }
};

const hardDeleteUser = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    await UserService.hardDeleteUser(req.params.id);
    res.json({ message: 'Usuario eliminado permanentemente' });
  } catch (e) {
    handleError(res, e);
  }
};

module.exports = {
  createUser,
  getUsers,
  getAllUsers,
  updateUser,
  restoreUser,
  softDeleteUser,
  hardDeleteUser
};
