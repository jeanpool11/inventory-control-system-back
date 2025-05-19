const OperationDao = require('../../daos/operationDao');

const countAll = () => OperationDao.countAll();
const findAllWithProduct = () => OperationDao.findAllWithProduct();
const create = (data) => OperationDao.create(data);

module.exports = {
  countAll,
  findAllWithProduct,
  create,
};
