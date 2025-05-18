const { matchedData } = require('express-validator');
const {
  handleHttpError,
  handleErrorResponse,
} = require('../utils/handleError');

const SupplierDao = require('../daos/supplierDao');

/* --------------------------------------------------------- */
/*  Crear proveedor                                           */
/* --------------------------------------------------------- */
const createSupplier = async (req, res) => {
  try {
    const body = matchedData(req);

    const exists = await SupplierDao.findByEmail(body.email);
    if (exists) return handleErrorResponse(res, 'SUPPLIER_EXISTS', 409);

    const data = await SupplierDao.create(body);
    return res.status(201).json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* --------------------------------------------------------- */
/*  Actualizar proveedor                                      */
/* --------------------------------------------------------- */
const updateSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const body   = matchedData(req);

    const data = await SupplierDao.updateById(id, body);
    if (!data) return handleErrorResponse(res, 'SUPPLIER_NOT_FOUND', 404);

    return res.json({ message: 'Proveedor actualizado', data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* --------------------------------------------------------- */
/*  Listar proveedores activos                                */
/* --------------------------------------------------------- */
const getSuppliers = async (_req, res) => {
  try {
    const data = await SupplierDao.findActive();
    return res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* --------------------------------------------------------- */
/*  Eliminación lógica                                        */
/* --------------------------------------------------------- */
const softDeleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SupplierDao.softDeleteById(id);

    if (!result) return handleErrorResponse(res, 'SUPPLIER_NOT_FOUND', 404);
    return res.json({ message: 'Proveedor eliminado lógicamente' });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* --------------------------------------------------------- */
/*  Eliminación física                                        */
/* --------------------------------------------------------- */
const hardDeleteSupplier = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await SupplierDao.hardDeleteById(id);

    if (result.deletedCount === 0)
      return handleErrorResponse(res, 'SUPPLIER_NOT_FOUND', 404);

    return res.json({ message: 'Proveedor eliminado permanentemente' });
  } catch (e) {
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
