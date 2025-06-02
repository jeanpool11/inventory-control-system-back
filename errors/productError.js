module.exports = {
    PRODUCT_CODE_EXISTS: {
      message: "El código de producto ya está registrado",
      status: 409,
      code: "PRODUCT_CODE_EXISTS"
    },
    PRODUCT_CODE_ALREADY_USED: {
      message: "El código de producto ya está en uso por otro producto",
      status: 409,
      code: "PRODUCT_CODE_ALREADY_USED"
    },
    PRODUCT_NOT_FOUND: {
      message: "Producto no encontrado",
      status: 404,
      code: "PRODUCT_NOT_FOUND"
    },
    NOT_ALLOWED: {
      message: "No tienes permisos para realizar esta acción",
      status: 403,
      code: "NOT_ALLOWED"
    },
    PAGE_OUT_OF_RANGE: {
      message: "Página fuera de rango",
      status: 404,
      code: "PAGE_OUT_OF_RANGE"
    }
  };
  