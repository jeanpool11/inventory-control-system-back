module.exports = {
    SUPPLIER_EXISTS: {
      message: "El proveedor ya existe",
      status: 409,
      code: "SUPPLIER_EXISTS"
    },
    SUPPLIER_EMAIL_EXISTS: {
      message: "Ya existe un proveedor con este correo electrónico",
      status: 409,
      code: "SUPPLIER_EMAIL_EXISTS"
    },
    SUPPLIER_RUC_EXISTS: {
      message: "Ya existe un proveedor con este RUC",
      status: 409,
      code: "SUPPLIER_RUC_EXISTS"
    },
    SUPPLIER_NOT_FOUND: {
      message: "Proveedor no encontrado",
      status: 404,
      code: "SUPPLIER_NOT_FOUND"
    },
    INVALID_PARAMETERS: {
      message: "Parámetros inválidos",
      status: 400,
      code: "INVALID_PARAMETERS"
    }
  };
  