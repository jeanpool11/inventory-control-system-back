module.exports = {
    NOT_ALLOWED: {
        message: "No tienes permisos para esta acción",
        status: 403,
        code: "NOT_ALLOWED"
    },
    INVALID_TOKEN: {
        message: "Token inválido o expirado",
        status: 401,
        code: "INVALID_TOKEN"
    },
    NO_TOKEN_PROVIDED: {
        message: "No se proporcionó token de autenticación",
        status: 401,
        code: "NO_TOKEN_PROVIDED"
    },
    INTERNAL_ERROR: {
        message: "Error interno del servidor",
        status: 500,
        code: "INTERNAL_ERROR"
    },
    INVALID_PARAMETERS: {
        message: "Parámetros de consulta inválidos",
        status: 400,
        code: "INVALID_PARAMETERS"
    },
};