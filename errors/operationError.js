module.exports = {
    OPERATION_NOT_FOUND: {
        message: "Operación no encontrada",
        status: 404,
        code: "OPERATION_NOT_FOUND"
    },
    OPERATION_ALREADY_DELETED: {
        message: "La operación ya está eliminada",
        status: 400,
        code: "OPERATION_ALREADY_DELETED"
    },
    OPERATION_NOT_DELETED: {
        message: "La operación no ha sido eliminada previamente",
        status: 400,
        code: "OPERATION_NOT_DELETED"
    },
    STOCK_INSUFFICIENT: {
        message: "Stock insuficiente para realizar la operación",
        status: 400,
        code: "STOCK_INSUFFICIENT"
    },
    PRODUCT_NOT_FOUND: {
        message: "Producto asociado a la operación no encontrado",
        status: 404,
        code: "PRODUCT_NOT_FOUND"
    }
};
