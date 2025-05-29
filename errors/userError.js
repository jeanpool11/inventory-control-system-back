module.exports = {
    USER_EXISTS: {
        message: "El correo electrónico ya está registrado",
        status: 409,
        code: "USER_EXISTS"
    },
    USER_NOT_FOUND: {
        message: "Usuario no encontrado",
        status: 404,
        code: "USER_NOT_FOUND"
    },
    INVALID_CREDENTIALS: {
        message: "Credenciales inválidas",
        status: 401,
        code: "INVALID_CREDENTIALS"
    }
};