const { matchedData } = require('express-validator');
const {
  handleHttpError,
  handleErrorResponse,
} = require('../utils/handleError');

const ProductService = require('../services/productService');

const createProduct = async (req, res) => {
  try {
    const body = matchedData(req);
    const data = await ProductService.createProduct(body);
    res.status(201).json({ message: 'Producto creado correctamente', data });
  } catch (e) {
    if (e.message === 'PRODUCT_CODE_EXISTS') return handleErrorResponse(res, e.message, 409);
    handleHttpError(res, e);
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);
    const data = await ProductService.updateProduct(id, body);
    res.json({ message: 'Producto actualizado', data });
  } catch (e) {
    if (['PRODUCT_CODE_ALREADY_USED', 'PRODUCT_NOT_FOUND'].includes(e.message))
      return handleErrorResponse(res, e.message, 409);
    handleHttpError(res, e);
  }
};

const getProducts = async (_req, res) => {
  try {
    const data = await ProductService.getActiveProducts();
    res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const softDeleteProduct = async (req, res) => {
  try {
    await ProductService.softDeleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado lógicamente' });
  } catch (e) {
    if (e.message === 'PRODUCT_NOT_FOUND') return handleErrorResponse(res, e.message, 404);
    handleHttpError(res, e);
  }
};

const hardDeleteProduct = async (req, res) => {
  try {
    await ProductService.hardDeleteProduct(req.params.id);
    res.json({ message: 'Producto eliminado permanentemente' });
  } catch (e) {
    if (e.message === 'PRODUCT_NOT_FOUND') return handleErrorResponse(res, e.message, 404);
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
