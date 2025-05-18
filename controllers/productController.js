const { matchedData } = require('express-validator');
const {
  handleHttpError,
  handleErrorResponse,
} = require('../utils/handleError');

const ProductDao = require('../daos/productDao');

/* ---------------------------------------------------- */
/*  Crear producto                                      */
/* ---------------------------------------------------- */
const createProduct = async (req, res) => {
  try {
    const body = matchedData(req);

    const exists = await ProductDao.findByCode(body.code);
    if (exists) return handleErrorResponse(res, 'PRODUCT_CODE_EXISTS', 409);

    const data = await ProductDao.create(body);
    return res
      .status(201)
      .json({ message: 'Producto creado correctamente', data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ---------------------------------------------------- */
/*  Actualizar producto                                 */
/* ---------------------------------------------------- */
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body   = matchedData(req);

    const exists = await ProductDao.existsCodeExceptId(body.code, id);
    if (exists) return handleErrorResponse(res, 'PRODUCT_CODE_ALREADY_USED', 409);

    const data = await ProductDao.updateById(id, body);
    if (!data) return handleErrorResponse(res, 'PRODUCT_NOT_FOUND', 404);

    return res.json({ message: 'Producto actualizado', data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ---------------------------------------------------- */
/*  Obtener productos activos + estado de stock         */
/* ---------------------------------------------------- */
const getProducts = async (_req, res) => {
  try {
    const products = await ProductDao.findActiveWithSupplier();

    const data = products.map((p) => {
      let status = 'suficiente';          // 🟢
      if (p.stock <= p.minStock)                   status = 'crítico';   // 🔴
      else if (p.stock <= p.maxStock)              status = 'moderado';  // 🟡
      return { ...p, status };
    });

    return res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ---------------------------------------------------- */
/*  Eliminación lógica                                  */
/* ---------------------------------------------------- */
const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductDao.softDeleteById(id);

    if (!result) return handleErrorResponse(res, 'PRODUCT_NOT_FOUND', 404);
    return res.json({ message: 'Producto eliminado lógicamente' });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* ---------------------------------------------------- */
/*  Eliminación física                                  */
/* ---------------------------------------------------- */
const hardDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const result = await ProductDao.hardDeleteById(id);

    if (!result || result.deletedCount === 0)
      return handleErrorResponse(res, 'PRODUCT_NOT_FOUND', 404);

    return res.json({ message: 'Producto eliminado permanentemente' });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  softDeleteProduct,
  hardDeleteProduct,
};
