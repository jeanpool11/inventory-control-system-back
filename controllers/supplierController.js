const { matchedData } = require('express-validator');
const { handleHttpError, handleErrorResponse } = require('../utils/handleError');
const SupplierService = require('../services/supplierService');

/* Crear proveedor */
const createSupplier = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await SupplierService.createSupplier(body);
    return res.status(201).json({ data });
  } catch (e) {
    if (e.message === 'SUPPLIER_EXISTS') return handleErrorResponse(res, e.message, 409);
    handleHttpError(res, e);
  }
};

/* Actualizar proveedor */
const updateSupplier = async (req, res) => {
  try {
    const body = matchedData(req);
    const { id } = req.params;
    const data = await SupplierService.updateSupplier(id, body);
    return res.json({ message: 'Proveedor actualizado', data });
  } catch (e) {
    if (e.message === 'SUPPLIER_NOT_FOUND') return handleErrorResponse(res, e.message, 404);
    handleHttpError(res, e);
  }
};

/* Listar proveedores */
const getSuppliers = async (_req, res) => {
  try {
    const data = await SupplierService.getActiveSuppliers();
    return res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* Eliminación lógica */
const softDeleteSupplier = async (req, res) => {
  try {
    await SupplierService.softDeleteSupplier(req.params.id);
    return res.json({ message: 'Proveedor eliminado lógicamente' });
  } catch (e) {
    if (e.message === 'SUPPLIER_NOT_FOUND') return handleErrorResponse(res, e.message, 404);
    handleHttpError(res, e);
  }
};

/* Eliminación física */
const hardDeleteSupplier = async (req, res) => {
  try {
    await SupplierService.hardDeleteSupplier(req.params.id);
    return res.json({ message: 'Proveedor eliminado permanentemente' });
  } catch (e) {
    if (e.message === 'SUPPLIER_NOT_FOUND') return handleErrorResponse(res, e.message, 404);
    handleHttpError(res, e);
  }
};

module.exports = {
  createSupplier,
  updateSupplier,
  getSuppliers,
  softDeleteSupplier,
  hardDeleteSupplier,
};
