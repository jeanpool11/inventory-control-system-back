const { encrypt } = require('../utils/handleJwt');
const { throwError, USER_EXISTS, USER_NOT_FOUND, INVALID_PARAMETERS } = require('../errors');
const UserRepository = require('../repositories/nosql/userRepository');
const { PAGE_OUT_OF_RANGE } = require('../errors/productError');

const createUser = async (userData) => {
  const exists = await UserRepository.findByEmail(userData.email);
  if (exists) throwError(USER_EXISTS);
  
  const password = await encrypt(userData.password);
  return UserRepository.create({ 
    ...userData, 
    password, 
    role: 'seller',
    deleted: false
  });
};

const updateUser = async (id, updateData) => {
  if (updateData.email) {
    const existingUser = await UserRepository.findByEmail(updateData.email);
    if (existingUser && existingUser._id.toString() !== id) {
      throwError(USER_EXISTS);
    }
  }

  if (updateData.role) delete updateData.role;
  
  if (updateData.password) {
    updateData.password = await encrypt(updateData.password);
  }

  const updated = await UserRepository.updateById(id, updateData);
  if (!updated) throwError(USER_NOT_FOUND);

  return updated;
};

const getActiveUsers = async (page = 1, limit = 5, search = '') => {
  // Validar parámetros básicos
  if (page < 1 || limit < 1 || limit > 100) {
    throwError(INVALID_PARAMETERS);
  }

  const skip = (page - 1) * limit;
  const result = await UserRepository.findActive({ skip, limit, search });
  
  if (page > 1 && result.data.length === 0) {
    throwError(PAGE_OUT_OF_RANGE);
  }
  
  return result;
};

const getAllUsers = async (
  page = 1,
  limit = 5,
  search = '',
  role = '',
  sort = 'createdAt',
  direction = 'desc'
) => {
  const skip = (page - 1) * limit;
  const queryExtras = {};

  if (role) {
    queryExtras.role = role;
  }

  const result = await UserRepository.findAll({
    skip,
    limit,
    search,
    sort,
    direction,
    ...queryExtras,
  });

  if (page > 1 && result.data.length === 0) {
    throwError(PAGE_OUT_OF_RANGE);
  }

  return result;
};

const restoreUser = async (id) => {
  const user = await UserRepository.restoreById(id);
  if (!user) throwError(USER_NOT_FOUND);
  return user;
};

const softDeleteUser = async (id) => {
  const result = await UserRepository.softDeleteById(id);
  if (!result) throwError(USER_NOT_FOUND);
  return result;
};

const hardDeleteUser = async (id) => {
  const result = await UserRepository.hardDeleteById(id);
  if (!result) throwError(USER_NOT_FOUND);
  return result;
};

module.exports = {
  createUser,
  updateUser,
  getActiveUsers,
  getAllUsers,
  restoreUser,
  softDeleteUser,
  hardDeleteUser
};