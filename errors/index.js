const generalError = require('./generalError');
const userError = require('./userError');
const supplierError = require('./supplierError');

module.exports = {
    ...generalError,
    ...userError,
    ...supplierError,
    
    throwError: (errorType, additionalInfo = null) => {
        const error = new Error(errorType.message);
        error.code = errorType.code;
        error.status = errorType.status;
        error.additional = additionalInfo;
        throw error;
    },
    
    handleError: (res, error) => {
        const isDev = process.env.NODE_ENV !== 'production';
        
        if (error.status) {
            return res.status(error.status).json({
                error: error.code || 'UNKNOWN_ERROR',
                message: error.message,
                ...(isDev && { stack: error.stack }),
                ...(error.additional && { details: error.additional })
            });
        }
        
        // Error no controlado
        console.error('Unhandled Error:', error);
        res.status(500).json({
            error: 'INTERNAL_ERROR',
            message: 'Error interno del servidor',
            ...(isDev && { stack: error.stack })
        });
    }
};