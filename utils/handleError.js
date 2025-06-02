
const handleHttpError = (res, error, statusCode = 500) => {
  const timestamp = new Date().toString();
  const stackTrace = error.stack || "No stack";

  const formatted = {
    timestamp,
    status: statusCode,
    error: error.code || "INTERNAL_ERROR",
    message: error.message || "Error interno del servidor",
    stack: stackTrace.split('\n').slice(0, 5).join('\n'), // mostrar primeras 5 líneas
  };

  const output = JSON.stringify(formatted, null, 2);

  return res.status(statusCode).json({
    error: formatted.error,
    message: formatted.message,
  });
};

const handleErrorResponse = (res, code, status = 400) => {
  const response = {
    error: code,
    message: code.replace(/_/g, " ").toLowerCase(),
  };

  res.status(status).json(response);
};

const throwError = (code, message = null) => {
  const error = new Error(message || code);
  error.code = code;
  throw error;
};

module.exports = {
  handleHttpError,
  handleErrorResponse,
  throwError,
};
