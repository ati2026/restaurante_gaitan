// ======================================================
// Respuestas estándar de la API
// ======================================================

const success = (res, statusCode, mensaje, data = null) => {

    return res.status(statusCode).json({

        ok: true,

        mensaje,

        data

    });

};

const error = (res, statusCode, mensaje) => {

    return res.status(statusCode).json({

        ok: false,

        mensaje

    });

};

module.exports = {

    success,

    error

};