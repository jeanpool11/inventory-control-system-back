const { encrypt } = require('../utils/handleJwt');
const { UserRepository } = require('../repositories');

const createUser = async (userData) => {
  const exists = await UserRepository.findByEmail(userData.email);
  if (exists) throw new Error('USER_EXISTS');

  const password = await encrypt(userData.password);
  const user = await UserRepository.create({ ...userData, password, role: 'seller' });
  return user;
};

const updateUser = async (id, updateData) => {
  if (updateData.role) delete updateData.role;
  if (updateData.password) updateData.password = await encrypt(updateData.password);

  const updated = await UserRepository.updateById(id, updateData);
  if (!updated) throw new Error('USER_NOT_FOUND');

  return updated;
};

const getActiveUsers = async () => UserRepository.findActive();
const softDeleteUser = async (id) => UserRepository.softDeleteById(id);
const hardDeleteUser = async (id) => UserRepository.hardDeleteById(id);

module.exports = {
  createUser,
  updateUser,
  getActiveUsers,
  softDeleteUser,
  hardDeleteUser,
};
