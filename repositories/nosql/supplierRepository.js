const SupplierDao = require('../../daos/supplierDao');

const findByEmail = (email) => SupplierDao.findByEmail(email);
const findByRuc = (ruc) => SupplierDao.findByRuc(ruc);
const create = (data) => SupplierDao.create(data);
const updateById = (id, data) => SupplierDao.updateById(id, data);
const findById = (id) => SupplierDao.findById(id);
const softDeleteById = (id) => SupplierDao.softDeleteById(id);
const hardDeleteById = (id) => SupplierDao.hardDeleteById(id);
const restoreById = (id) => SupplierDao.restoreById(id);
const findAllActiveRaw = () => SupplierDao.findAllActiveRaw();
const findAllWithDeletedRaw = () => SupplierDao.findAllWithDeletedRaw();

module.exports = {
  findByEmail,
  findByRuc,
  create,
  updateById,
  findById,
  softDeleteById,
  hardDeleteById,
  restoreById,
  findAllActiveRaw,
  findAllWithDeletedRaw
};
