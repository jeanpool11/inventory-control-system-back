const { matchedData } = require("express-validator");
const { OperationModel, ProductModel } = require("../models");
const { handleHttpError, handleErrorResponse } = require("../utils/handleError");

// Crear operación
const createOperation = async (req, res) => {
  try {
    const body = matchedData(req);
    const { type, product, quantity, description } = body;

    // Buscar producto
    const productData = await ProductModel.findById(product);
    if (!productData) {
      return handleErrorResponse(res, "PRODUCT_NOT_FOUND", 404);
    }

    // Verificar stock en pedidos
    if (type === "pedido" && productData.stock < quantity) {
      return handleErrorResponse(res, "STOCK_INSUFFICIENT", 400);
    }

    // Ajustar stock
    const newStock = type === "pedido"
      ? productData.stock - quantity
      : productData.stock + quantity;

    productData.stock = newStock;
    await productData.save();

    // Generar código automáticamente
    const count = await OperationModel.countDocuments(); // total de operaciones actuales
    const newCode = `OP-${(count + 1).toString().padStart(4, "0")}`; // ej: OP-0001

    // Registrar operación
    const data = await OperationModel.create({
      code: newCode,
      type,
      product,
      quantity,
      description
    });

    res.status(201).json({
      message: `Operación '${type}' registrada correctamente`,
      data,
    });

  } catch (e) {
    handleHttpError(res, e);
  }
};


// Obtener historial (kardex)
const getOperations = async (req, res) => {
  try {
    const data = await OperationModel.find()
      .populate("product")
      .sort({ createdAt: -1 }); // orden más reciente primero

    res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = {
  createOperation,
  getOperations,
};
