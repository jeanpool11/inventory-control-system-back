const { SupplierRepository } = require('../repositories');

const createSupplier = async (data) => {
  const exists = await SupplierRepository.findByEmail(data.email);
  if (exists) throw new Error('SUPPLIER_EXISTS');

  return await SupplierRepository.create(data);
};

const updateSupplier = async (id, data) => {
  const updated = await SupplierRepository.updateById(id, data);
  if (!updated) throw new Error('SUPPLIER_NOT_FOUND');
  return updated;
};

const getActiveSuppliers = async () => {
  return await SupplierRepository.findActive();
};

const softDeleteSupplier = async (id) => {
  const result = await SupplierRepository.softDeleteById(id);
  if (!result) throw new Error('SUPPLIER_NOT_FOUND');
  return result;
};

const hardDeleteSupplier = async (id) => {
  const result = await SupplierRepository.hardDeleteById(id);
  if (result.deletedCount === 0) throw new Error('SUPPLIER_NOT_FOUND');
  return result;
};

module.exports = {
  createSupplier,
  updateSupplier,
  getActiveSuppliers,
  softDeleteSupplier,
  hardDeleteSupplier,
};
