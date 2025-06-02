const { encrypt } = require('../utils/handleJwt');
const { throwError, USER_EXISTS, USER_NOT_FOUND } = require('../errors');
const UserRepository = require('../repositories/nosql/userRepository');

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

const getActiveUsers = async () => {
  return await UserRepository.findAllActiveRaw();
};

const getAllUsers = async () => {
  return await UserRepository.findAllWithDeletedRaw();
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
