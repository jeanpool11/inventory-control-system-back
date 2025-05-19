const { ProductRepository } = require('../repositories');

const createProduct = async (data) => {
  const exists = await ProductRepository.findByCode(data.code);
  if (exists) throw new Error('PRODUCT_CODE_EXISTS');

  return await ProductRepository.create(data);
};

const updateProduct = async (id, data) => {
  const exists = await ProductRepository.existsCodeExceptId(data.code, id);
  if (exists) throw new Error('PRODUCT_CODE_ALREADY_USED');

  const updated = await ProductRepository.updateById(id, data);
  if (!updated) throw new Error('PRODUCT_NOT_FOUND');

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

const softDeleteProduct = async (id) => {
  const result = await ProductRepository.softDeleteById(id);
  if (!result) throw new Error('PRODUCT_NOT_FOUND');
  return result;
};

const hardDeleteProduct = async (id) => {
  const result = await ProductRepository.hardDeleteById(id);
  if (!result || result.deletedCount === 0) throw new Error('PRODUCT_NOT_FOUND');
  return result;
};

module.exports = {
  createProduct,
  updateProduct,
  getActiveProducts,
  softDeleteProduct,
  hardDeleteProduct,
};
