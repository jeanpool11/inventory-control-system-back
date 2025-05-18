const { matchedData } = require('express-validator');
const {
  handleHttpError,
  handleErrorResponse,
} = require('../utils/handleError');

const OperationDao = require('../daos/operationDao');
const ProductDao   = require('../daos/productDao');

/* --------------------------------------------------------- */
/*  Crear operación (pedido o devolución)                    */
/* --------------------------------------------------------- */
const createOperation = async (req, res) => {
  try {
    const { type, product, quantity, description } = matchedData(req);

    // 1. Verificar existencia de producto
    const productDoc = await ProductDao.findById(product);
    if (!productDoc)
      return handleErrorResponse(res, 'PRODUCT_NOT_FOUND', 404);

    // 2. Validar stock para pedido
    if (type === 'pedido' && productDoc.stock < quantity)
      return handleErrorResponse(res, 'STOCK_INSUFFICIENT', 400);

    // 3. Ajustar stock
    const updated =
      type === 'pedido'
        ? await ProductDao.decreaseStock(product, quantity)
        : await ProductDao.increaseStock(product, quantity);

    // 4. Generar código correlativo
    const count   = await OperationDao.countAll();
    const newCode = `OP-${(count + 1).toString().padStart(4, '0')}`; // OP-0001

    // 5. Registrar operación
    const data = await OperationDao.create({
      code: newCode,
      type,
      product,
      quantity,
      description,
    });

    return res.status(201).json({
      message: `Operación '${type}' registrada correctamente`,
      data,
      newStock: updated.stock,
    });
  } catch (e) {
    handleHttpError(res, e);
  }
};

/* --------------------------------------------------------- */
/*  Obtener historial (kardex)                               */
/* --------------------------------------------------------- */
const getOperations = async (_req, res) => {
  try {
    const data = await OperationDao.findAllWithProduct();
    return res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

module.exports = {
  createOperation,
  getOperations,
};
