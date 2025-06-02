const { matchedData } = require('express-validator');
const { throwError, handleError } = require('../errors');
const SupplierService = require('../services/supplierService');
const { NOT_ALLOWED } = require('../errors/supplierError');

const createSupplier = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const body = matchedData(req);
    const data = await SupplierService.createSupplier(body);
    res.status(201).json({ data });
  } catch (e) {
    handleError(res, e);
  }
};

const updateSupplier = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const body = matchedData(req);
    const { id } = req.params;
    const data = await SupplierService.updateSupplier(id, body);
    res.json({ message: 'Proveedor actualizado', data });
  } catch (e) {
    handleError(res, e);
  }
};

const getSuppliers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const data = await SupplierService.getActiveSuppliers();
    res.json({ data });
  } catch (e) {
    handleError(res, e);
  }
};

const getAllSuppliers = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const data = await SupplierService.getAllSuppliers();
    res.json({ data });
  } catch (e) {
    handleError(res, e);
  }
};

const restoreSupplier = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    const data = await SupplierService.restoreSupplier(req.params.id);
    res.json({ message: 'Proveedor reactivado', data });
  } catch (e) {
    handleError(res, e);
  }
};

const softDeleteSupplier = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    await SupplierService.softDeleteSupplier(req.params.id);
    res.json({ message: 'Proveedor desactivado' });
  } catch (e) {
    handleError(res, e);
  }
};

const hardDeleteSupplier = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);
    await SupplierService.hardDeleteSupplier(req.params.id);
    res.json({ message: 'Proveedor eliminado permanentemente' });
  } catch (e) {
    handleError(res, e);
  }
};

module.exports = {
  createSupplier,
  updateSupplier,
  getSuppliers,
  getAllSuppliers,
  restoreSupplier,
  softDeleteSupplier,
  hardDeleteSupplier
};
