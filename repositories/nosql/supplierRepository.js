const SupplierDao = require('../../daos/supplierDao');

const findByEmail = (email) => SupplierDao.findByEmail(email);
const findActive = (extras) => SupplierDao.findActive(extras);
const findById = (id) => SupplierDao.findById(id);
const create = (data) => SupplierDao.create(data);
const updateById = (id, data) => SupplierDao.updateById(id, data);
const softDeleteById = (id) => SupplierDao.softDeleteById(id);
const hardDeleteById = (id) => SupplierDao.hardDeleteById(id);

module.exports = {
  findByEmail,
  findActive,
  findById,
  create,
  updateById,
  softDeleteById,
  hardDeleteById,
};
