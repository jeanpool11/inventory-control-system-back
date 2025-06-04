const { matchedData } = require('express-validator');
const {
  handleHttpError,
  handleErrorResponse,
} = require('../utils/handleError');
const OperationService = require('../services/operationService');

const createOperation = async (req, res) => {
  try {
    const data = matchedData(req);
    const result = await OperationService.createOperation(data);

    return res.status(201).json({
      message: `Operación '${data.type}' registrada correctamente`,
      data: result.data,
      newStock: result.newStock,
    });
  } catch (e) {
    if (['PRODUCT_NOT_FOUND', 'STOCK_INSUFFICIENT'].includes(e.message)) {
      const status = e.message === 'PRODUCT_NOT_FOUND' ? 404 : 400;
      return handleErrorResponse(res, e.message, status);
    }
    handleHttpError(res, e);
  }
};

const getOperations = async (_req, res) => {
  try {
    const data = await OperationService.getOperations();
    res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};

const deleteOperation = async (req, res) => {
  try {
    const result = await OperationService.deleteOperationPermanently(req.params.id);
    res.json(result);
  } catch (e) {
    handleHttpError(res, e);
  }
};

const softDeleteOperation = async (req, res) => {
  try {
    const result = await OperationService.softDeleteOperation(req.params.id);
    res.json(result);
  } catch (e) {
    handleHttpError(res, e);
  }
};

const restoreOperation = async (req, res) => {
  try {
    const result = await OperationService.restoreOperation(req.params.id);
    res.json(result);
  } catch (e) {
    handleHttpError(res, e);
  }
};

const getAllOperations = async (_req, res) => {
  try {
    const data = await OperationService.getAllOperations();
    res.json({ data });
  } catch (e) {
    handleHttpError(res, e);
  }
};


module.exports = {
  createOperation,
  getOperations,
  deleteOperation,
  softDeleteOperation,
  restoreOperation,
  getAllOperations
};
