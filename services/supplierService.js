const { SupplierRepository } = require('../repositories');
const { throwError } = require('../errors');
const {
  SUPPLIER_NOT_FOUND,
  SUPPLIER_EMAIL_EXISTS,
  SUPPLIER_RUC_EXISTS
} = require('../errors/supplierError');

const createSupplier = async (data) => {
  const emailExists = await SupplierRepository.findByEmail(data.email);
  if (emailExists) throwError(SUPPLIER_EMAIL_EXISTS);

  const rucExists = await SupplierRepository.findByRuc(data.ruc);
  if (rucExists) throwError(SUPPLIER_RUC_EXISTS);

  return await SupplierRepository.create({ ...data, deleted: false });
};

const updateSupplier = async (id, data) => {
  const supplier = await SupplierRepository.findById(id);
  if (!supplier) throwError(SUPPLIER_NOT_FOUND);

  if (data.email && data.email !== supplier.email) {
    const existingEmail = await SupplierRepository.findByEmail(data.email);
    if (existingEmail && existingEmail._id.toString() !== id) {
      throwError(SUPPLIER_EMAIL_EXISTS);
    }
  }

  if (data.ruc && data.ruc !== supplier.ruc) {
    const existingRuc = await SupplierRepository.findByRuc(data.ruc);
    if (existingRuc && existingRuc._id.toString() !== id) {
      throwError(SUPPLIER_RUC_EXISTS);
    }
  }

  const updated = await SupplierRepository.updateById(id, {
    name: data.name,
    phone: data.phone,
    email: data.email,
    address: data.address,
    ruc: data.ruc
  });

  if (!updated) throwError(SUPPLIER_NOT_FOUND);
  return updated;
};

const getActiveSuppliers = async () => {
  return await SupplierRepository.findAllActiveRaw();
};

const getAllSuppliers = async () => {
  return await SupplierRepository.findAllWithDeletedRaw();
};

const restoreSupplier = async (id) => {
  const restored = await SupplierRepository.restoreById(id);
  if (!restored) throwError(SUPPLIER_NOT_FOUND);
  return restored;
};

const softDeleteSupplier = async (id) => {
  const result = await SupplierRepository.softDeleteById(id);
  if (!result) throwError(SUPPLIER_NOT_FOUND);
  return result;
};

const hardDeleteSupplier = async (id) => {
  const result = await SupplierRepository.hardDeleteById(id);
  if (!result || result.deletedCount === 0) throwError(SUPPLIER_NOT_FOUND);
  return result;
};

module.exports = {
  createSupplier,
  updateSupplier,
  getActiveSuppliers,
  getAllSuppliers,
  restoreSupplier,
  softDeleteSupplier,
  hardDeleteSupplier
};
