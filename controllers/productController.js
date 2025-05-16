const { handleHttpError, handleErrorResponse } = require("../utils/handleError");
const { ProductModel } = require("../models");
const { matchedData } = require("express-validator");

// Crear producto
const createProduct = async (req, res) => {
  try {
    const body = matchedData(req);
    
    // Verificar si el código del producto ya existe
    const exists = await ProductModel.findOne({ code: body.code });
    if (exists) return handleErrorResponse(res, "PRODUCT_CODE_EXISTS", 409);

    const data = await ProductModel.create(body);
    res.status(201).json({ message: "Producto creado correctamente", data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Actualizar producto
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const body = matchedData(req);

    const exists = await ProductModel.findOne({ code: body.code, _id: { $ne: id } });
    if (exists) return handleErrorResponse(res, "PRODUCT_CODE_ALREADY_USED", 409);

    const data = await ProductModel.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!data) return handleErrorResponse(res, "PRODUCT_NOT_FOUND", 404);

    res.json({ message: "Producto actualizado", data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Obtener productos (activos) con datos del proveedor y estado del stock
const getProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({ deleted: { $ne: true } }).populate("supplier").lean();

    // Agregar campo 'status' según stock
    const data = products.map((product) => {
      let status = "suficiente"; // 🟢
      if (product.stock <= product.minStock) {
        status = "crítico"; // 🔴
      } else if (product.stock > product.minStock && product.stock <= product.maxStock) {
        status = "moderado"; // 🟡
      }

      return {
        ...product,
        status,
      };
    });

    res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Eliminación lógica
const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductModel.delete({ _id: id });

    if (!data) return handleErrorResponse(res, "PRODUCT_NOT_FOUND", 404);

    res.json({ message: "Producto eliminado lógicamente" });
  } catch (e) {
    handleHttpError(res, e);
  }
};

// Eliminación física
const hardDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const data = await ProductModel.deleteOne({ _id: id });

    if (!data || data.deletedCount === 0) {
      return handleErrorResponse(res, "PRODUCT_NOT_FOUND", 404);
    }

    res.json({ message: "Producto eliminado permanentemente" });
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
