// ======================================================
// Validaciones para Mesas
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const { body, param, validationResult } = require("express-validator");

// ======================================================
// Middleware para validar errores
// ======================================================

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

// ======================================================
// Validaciones para crear una mesa
// ======================================================

const validarCrearMesa = [

    body("numero")

        .notEmpty()
        .withMessage("El número de la mesa es obligatorio.")

        .isInt({ min: 1 })
        .withMessage("El número de la mesa debe ser un entero mayor que cero."),

    body("capacidad")

        .notEmpty()
        .withMessage("La capacidad es obligatoria.")

        .isInt({ min: 1, max: 20 })
        .withMessage("La capacidad debe estar entre 1 y 20 personas."),

    body("ubicacion")

        .notEmpty()
        .withMessage("La ubicación es obligatoria.")

        .isLength({ min: 3, max: 100 })
        .withMessage("La ubicación debe tener entre 3 y 100 caracteres."),

    body("estado")

        .optional()

        .isIn([
            "Disponible",
            "Ocupada",
            "Mantenimiento"
        ])

        .withMessage(
            "Estado inválido. Valores permitidos: Disponible, Ocupada o Mantenimiento."
        ),

    validarCampos

];

// ======================================================
// Validaciones para actualizar una mesa
// ======================================================

const validarActualizarMesa = [

    param("id")

        .isInt({ min: 1 })

        .withMessage("El ID de la mesa es inválido."),

    body("numero")

        .notEmpty()

        .isInt({ min: 1 })

        .withMessage("El número de la mesa es obligatorio."),

    body("capacidad")

        .notEmpty()

        .isInt({ min: 1, max: 20 })

        .withMessage("La capacidad debe estar entre 1 y 20 personas."),

    body("ubicacion")

        .notEmpty()

        .isLength({ min: 3, max: 100 })

        .withMessage("La ubicación es obligatoria."),

    body("estado")

        .notEmpty()

        .isIn([
            "Disponible",
            "Ocupada",
            "Mantenimiento"
        ])

        .withMessage(
            "Estado inválido."
        ),

    validarCampos

];

// ======================================================
// Validación para obtener una mesa
// ======================================================

const validarIdMesa = [

    param("id")

        .isInt({ min: 1 })

        .withMessage("ID de mesa inválido."),

    validarCampos

];

// ======================================================
// Exportaciones
// ======================================================

module.exports = {

    validarCrearMesa,

    validarActualizarMesa,

    validarIdMesa,

    validarCampos

};