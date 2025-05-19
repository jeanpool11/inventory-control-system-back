const ProductDao = require('../../daos/productDao');

const findById = (id) => ProductDao.findById(id);
const findByCode = (code) => ProductDao.findByCode(code);
const existsCodeExceptId = (code, id) => ProductDao.existsCodeExceptId(code, id);
const findActiveWithSupplier = () => ProductDao.findActiveWithSupplier();

const create = (data) => ProductDao.create(data);
const updateById = (id, update) => ProductDao.updateById(id, update);

const softDeleteById = (id) => ProductDao.softDeleteById(id);
const hardDeleteById = (id) => ProductDao.hardDeleteById(id);

const increaseStock = (id, qty) => ProductDao.increaseStock(id, qty);
const decreaseStock = (id, qty) => ProductDao.decreaseStock(id, qty);

module.exports = {
  findById,
  findByCode,
  existsCodeExceptId,
  findActiveWithSupplier,
  create,
  updateById,
  softDeleteById,
  hardDeleteById,
  increaseStock,
  decreaseStock,
};
