const UserDao = require('../../daos/userDao');

const findByEmail = (email) => UserDao.findByEmail(email);
const create = (data) => UserDao.create(data);
const updateById = (id, data) => UserDao.updateById(id, data);
const findActive = ({ skip, limit, search, ...extras }) => 
  UserDao.findActive({ skip, limit, search, ...extras });
const softDeleteById = (id) => UserDao.softDeleteById(id);
const hardDeleteById = (id) => UserDao.hardDeleteById(id);
const findById = (id) => UserDao.findById(id);
const findAll = ({ skip, limit, search, ...extras }) => 
  UserDao.findAll({ skip, limit, search, ...extras });
const restoreById = (id) => UserDao.restoreById(id);
const findByEmailWithoutDeleted = (email) => UserDao.findByEmailWithoutDeleted(email);



module.exports = {
  findByEmail,
  create,
  updateById,
  findActive,
  softDeleteById,
  hardDeleteById,
  findById,
  findAll,
  restoreById,
  findByEmailWithoutDeleted
};
