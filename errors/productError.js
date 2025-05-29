module.exports = {
    PRODUCT_EXISTS: {
        message: "El producto ya existe",
        status: 409,
        code: "PRODUCT_EXISTS"
    },
    PRODUCT_NOT_FOUND: {
        message: "Producto no encontrado",
        status: 404,
        code: "PRODUCT_NOT_FOUND"
    },
    PAGE_OUT_OF_RANGE: {
        message: "Página fuera de rango",
        status: 404,
        code: "PAGE_OUT_OF_RANGE"
    }
    // ...otros errores de producto
};