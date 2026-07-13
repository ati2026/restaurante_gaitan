// ======================================================
// Rutas: Reservaciones
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const express = require("express");

const router = express.Router();

const reservacionesController = require("../controllers/reservacionesController");

const { verificarToken } = require("../middlewares/authMiddleware");
const { verificarRol } = require("../middlewares/roleMiddleware");

const {
    validarCrearReservacion,
    validarListarReservaciones,
    validarCambiarEstadoReservacion,
    validarIdReservacion
} = require("../validators/reservacionValidator");

router.post(

    "/",

    verificarToken,

    verificarRol("CLIENTE"),

    validarCrearReservacion,

    reservacionesController.crearReservacion

);

router.get(

    "/mis",

    verificarToken,

    verificarRol("CLIENTE"),

    reservacionesController.listarMisReservaciones

);

router.get(

    "/",

    verificarToken,

    verificarRol("ADMIN"),

    validarListarReservaciones,

    reservacionesController.listarReservaciones

);

router.put(

    "/:id/estado",

    verificarToken,

    verificarRol("ADMIN"),

    validarCambiarEstadoReservacion,

    reservacionesController.cambiarEstadoReservacion

);

router.delete(

    "/:id",

    verificarToken,

    verificarRol("CLIENTE"),

    validarIdReservacion,

    reservacionesController.cancelarMiReservacion

);

module.exports = router;
