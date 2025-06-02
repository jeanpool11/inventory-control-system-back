const { ProductRepository } = require('../repositories');
const { throwError } = require('../errors');
const {
  PRODUCT_CODE_EXISTS,
  PRODUCT_CODE_ALREADY_USED,
  PRODUCT_NOT_FOUND
} = require('../errors/productError');

const createProduct = async (data) => {
  const exists = await ProductRepository.findByCode(data.code);
  if (exists) throwError(PRODUCT_CODE_EXISTS);

  return await ProductRepository.create({
    ...data,
    deleted: false
  });
};

const updateProduct = async (id, data) => {
  const exists = await ProductRepository.existsCodeExceptId(data.code, id);
  if (exists) throwError(PRODUCT_CODE_ALREADY_USED);

  const updated = await ProductRepository.updateById(id, data);
  if (!updated) throwError(PRODUCT_NOT_FOUND);

  return updated;
};

const getActiveProducts = async () => {
  const products = await ProductRepository.findActiveWithSupplier();

  return products.map((p) => {
    let status = 'suficiente';
    if (p.stock <= p.minStock) {
      status = 'crítico';
    } else if (p.stock <= p.maxStock) {
      status = 'moderado';
    }
    return { ...p, status };
  });
};

const getAllProducts = async () => {
  const products = await ProductRepository.findAllWithSupplier();

  return products.map((p) => {
    let status = 'suficiente';
    if (p.stock <= p.minStock) {
      status = 'crítico';
    } else if (p.stock <= p.maxStock) {
      status = 'moderado';
    }
    return { ...p, status };
  });
};


const restoreProduct = async (id) => {
  const restored = await ProductRepository.restoreById(id);
  if (!restored) throwError(PRODUCT_NOT_FOUND);
  return restored;
};

const softDeleteProduct = async (id) => {
  const result = await ProductRepository.softDeleteById(id);
  if (!result) throwError(PRODUCT_NOT_FOUND);
  return result;
};

const hardDeleteProduct = async (id) => {
  const result = await ProductRepository.hardDeleteById(id);
  if (!result || result.deletedCount === 0) throwError(PRODUCT_NOT_FOUND);
  return result;
};

module.exports = {
  createProduct,
  updateProduct,
  getActiveProducts,
  restoreProduct,
  softDeleteProduct,
  hardDeleteProduct,
  getAllProducts
};
