const UserDao = require('../../daos/userDao');

const findByEmail = (email) => UserDao.findByEmail(email);
const create = (data) => UserDao.create(data);
const updateById = (id, data) => UserDao.updateById(id, data);
const findActive = (extras) => UserDao.findActive(extras);
const softDeleteById = (id) => UserDao.softDeleteById(id);
const hardDeleteById = (id) => UserDao.hardDeleteById(id);
const findById = (id) => UserDao.findById(id);

module.exports = {
  findByEmail,
  create,
  updateById,
  findActive,
  softDeleteById,
  hardDeleteById,
  findById,
};
