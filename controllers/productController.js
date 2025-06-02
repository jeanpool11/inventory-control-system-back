const { matchedData } = require('express-validator');
const { throwError, handleError } = require('../errors');
const ProductService = require('../services/productService');
const {
  PRODUCT_NOT_FOUND,
  PRODUCT_CODE_EXISTS,
  PRODUCT_CODE_ALREADY_USED,
  NOT_ALLOWED
} = require('../errors/productError');

/* Crear producto */
const createProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);

    const body = matchedData(req);
    const data = await ProductService.createProduct(body);
    res.status(201).json({ message: 'Producto creado correctamente', data });
  } catch (e) {
    if (e.message === PRODUCT_CODE_EXISTS) return res.status(409).json({ error: e.message });
    handleError(res, e);
  }
};

/* Actualizar producto */
const updateProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);

    const { id } = req.params;
    const body = matchedData(req);
    const data = await ProductService.updateProduct(id, body);
    res.json({ message: 'Producto actualizado', data });
  } catch (e) {
    if ([PRODUCT_CODE_ALREADY_USED, PRODUCT_NOT_FOUND].includes(e.message))
      return res.status(409).json({ error: e.message });

    handleError(res, e);
  }
};

/* Listar productos activos */
const getProducts = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);

    const data = await ProductService.getActiveProducts();
    res.json({ data });
  } catch (e) {
    handleError(res, e);
  }
};

/* Listar todos los productos (activos + eliminados) */
const getAllProducts = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);

    const data = await ProductService.getAllProducts();
    res.json({ data });
  } catch (e) {
    handleError(res, e);
  }
};

/* Restaurar producto */
const restoreProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);

    const data = await ProductService.restoreProduct(req.params.id);
    res.json({ message: 'Producto restaurado', data });
  } catch (e) {
    handleError(res, e);
  }
};

/* Eliminación lógica */
const softDeleteProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);

    await ProductService.softDeleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado lógicamente' });
  } catch (e) {
    if (e.message === PRODUCT_NOT_FOUND) return res.status(404).json({ error: e.message });
    handleError(res, e);
  }
};

/* Eliminación física */
const hardDeleteProduct = async (req, res) => {
  try {
    if (req.user.role !== 'admin') throwError(NOT_ALLOWED);

    await ProductService.hardDeleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado permanentemente' });
  } catch (e) {
    if (e.message === PRODUCT_NOT_FOUND) return res.status(404).json({ error: e.message });
    handleError(res, e);
  }
};

module.exports = {
  createProduct,
  updateProduct,
  getProducts,
  getAllProducts,
  restoreProduct,
  softDeleteProduct,
  hardDeleteProduct,
};
