const generalError = require('./generalError');
const userError = require('./userError');
const supplierError = require('./supplierError');
const productError = require('./productError');
const operationError = require('./operationError');

module.exports = {
  ...generalError,
  ...userError,
  ...supplierError,
  ...productError,
  ...operationError,

  throwError: (errorType, additionalInfo = null) => {
    const error = new Error(errorType.message);
    error.code = errorType.code;
    error.status = errorType.status;
    error.additional = additionalInfo;
    throw error;
  },

  handleError: (res, error) => {
    const isDev = process.env.NODE_ENV !== 'production';

    const logPayload = {
      time: new Date().toString(),
      status: error.status || 500,
      error: error.code || 'INTERNAL_ERROR',
      message: error.message || 'Error interno del servidor',
      ...(error.additional && { details: error.additional }),
      ...(isDev && { stack: error.stack }),
    };



    // Envío al cliente
    const clientResponse = {
      error: logPayload.error,
      message: logPayload.message,
      ...(isDev && { stack: error.stack }),
      ...(error.additional && { details: error.additional }),
    };

    res.status(error.status || 500).json(clientResponse);
  }
};
