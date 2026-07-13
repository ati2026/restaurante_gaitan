// ======================================================
// Validaciones para Reservaciones
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const { body, param, query, validationResult } = require("express-validator");

const ESTADOS_RESERVACION = [
    "Pendiente",
    "Confirmada",
    "Cancelada",
    "Completada"
];

const validarCampos = (req, res, next) => {

    const errores = validationResult(req);

    if (!errores.isEmpty()) {

        return res.status(400).json({

            ok: false,

            mensaje: "Error de validación.",

            errores: errores.array()

        });

    }

    next();

};

const validarCrearReservacion = [

    body("mesa_id")

        .notEmpty()
        .withMessage("La mesa es obligatoria.")

        .isInt({ min: 1 })
        .withMessage("El ID de la mesa es inválido."),

    body("fecha")

        .notEmpty()
        .withMessage("La fecha es obligatoria.")

        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("La fecha debe tener formato YYYY-MM-DD."),

    body("hora")

        .notEmpty()
        .withMessage("La hora es obligatoria.")

        .matches(/^([01]\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/)
        .withMessage("La hora debe tener formato HH:MM o HH:MM:SS."),

    body("personas")

        .notEmpty()
        .withMessage("La cantidad de personas es obligatoria.")

        .isInt({ min: 1, max: 20 })
        .withMessage("La cantidad de personas debe estar entre 1 y 20."),

    body("observaciones")

        .optional({ nullable: true, checkFalsy: true })

        .isLength({ max: 500 })
        .withMessage("Las observaciones no pueden exceder 500 caracteres."),

    validarCampos

];

const validarListarReservaciones = [

    query("estado")

        .optional()

        .isIn(ESTADOS_RESERVACION)
        .withMessage("El estado del filtro es inválido."),

    query("fecha")

        .optional()

        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("La fecha del filtro debe tener formato YYYY-MM-DD."),

    query("desde")

        .optional()

        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("La fecha inicial debe tener formato YYYY-MM-DD."),

    query("hasta")

        .optional()

        .isISO8601({ strict: true, strictSeparator: true })
        .withMessage("La fecha final debe tener formato YYYY-MM-DD."),

    query("mesa_id")

        .optional()

        .isInt({ min: 1 })
        .withMessage("El filtro mesa_id es inválido."),

    query("usuario_id")

        .optional()

        .isInt({ min: 1 })
        .withMessage("El filtro usuario_id es inválido."),

    validarCampos

];

const validarCambiarEstadoReservacion = [

    param("id")

        .isInt({ min: 1 })
        .withMessage("El ID de la reservación es inválido."),

    body("estado")

        .notEmpty()
        .withMessage("El estado es obligatorio.")

        .isIn(ESTADOS_RESERVACION)
        .withMessage("El estado de la reservación es inválido."),

    validarCampos

];

const validarIdReservacion = [

    param("id")

        .isInt({ min: 1 })
        .withMessage("El ID de la reservación es inválido."),

    validarCampos

];

module.exports = {

    ESTADOS_RESERVACION,

    validarCrearReservacion,

    validarListarReservaciones,

    validarCambiarEstadoReservacion,

    validarIdReservacion,

    validarCampos

};
