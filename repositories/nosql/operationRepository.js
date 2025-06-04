const OperationDao = require('../../daos/operationDao');

const countAll = () => OperationDao.countAll();
const findAllWithProduct = () => OperationDao.findAllWithProduct();
const create = (data) => OperationDao.create(data);
const findById = (id) => OperationDao.findById(id);
const softDeleteById = (id) => OperationDao.softDeleteById(id);
const restoreById = (id) => OperationDao.restoreById(id);
const deleteOneById = (id) => OperationDao.deleteOneById(id);
const findAllIncludingDeleted = () => OperationDao.findAllIncludingDeleted();


module.exports = {
  countAll,
  findAllWithProduct,
  create,
  findById,
  softDeleteById,
  restoreById,
  deleteOneById,
  findAllIncludingDeleted
};
