const UserDao = require('../../daos/userDao');

const findByEmail = (email) => UserDao.findByEmail(email);
const findByEmailWithoutDeleted = (email) => UserDao.findByEmailWithoutDeleted(email);
const findById = (id) => UserDao.findById(id);

const create = (data) => UserDao.create(data);
const updateById = (id, data) => UserDao.updateById(id, data);
const softDeleteById = (id) => UserDao.softDeleteById(id);
const hardDeleteById = (id) => UserDao.hardDeleteById(id);
const restoreById = (id) => UserDao.restoreById(id);

const findAllActiveRaw = () => UserDao.findAllActiveRaw();
const findAllWithDeletedRaw = () => UserDao.findAllWithDeletedRaw();

module.exports = {
  findByEmail,
  findByEmailWithoutDeleted,
  findById,
  create,
  updateById,
  softDeleteById,
  hardDeleteById,
  restoreById,
  findAllActiveRaw,
  findAllWithDeletedRaw
};
