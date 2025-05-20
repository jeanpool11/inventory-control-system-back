const handleHttpError = (res, error) => {
  const isDev = process.env.NODE_ENV !== 'production';

  console.error('Error', error);

  res.status(500).send({
    error: 'INTERNAL_ERROR',
    ...(isDev && { message: error.message, stack: error.stack }), // Solo en desarrollo
  });
};

const handleErrorResponse = (res, message = 'Algo ocurrió', code = 401) => {
  console.error('Error', message);
  res.status(code).send({ error: message });
};

module.exports = { handleHttpError, handleErrorResponse };
