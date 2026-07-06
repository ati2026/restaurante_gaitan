// ======================================================
// Rutas: Mesas
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const express = require("express");

const router = express.Router();

// =========================================
// Controllers
// =========================================

const mesasController = require("../controllers/mesasController");

// =========================================
// Middlewares
// =========================================

const { verificarToken } = require("../middlewares/authMiddleware");

const { verificarRol } = require("../middlewares/roleMiddleware");

// =========================================
// Validators
// =========================================

const {

    validarCrearMesa,

    validarActualizarMesa,

    validarIdMesa

} = require("../validators/mesaValidator");

// ======================================================
// GET /api/mesas
// Listar todas las mesas
// Público
// ======================================================

router.get(

    "/",

    mesasController.listarMesas

);

// ======================================================
// GET /api/mesas/disponibles
// Listar únicamente las mesas disponibles
// Público
// ======================================================

router.get(

    "/disponibles",

    mesasController.listarDisponibles

);

// ======================================================
// GET /api/mesas/:id
// Obtener una mesa por ID
// Público
// ======================================================

router.get(

    "/:id",

    validarIdMesa,

    mesasController.obtenerMesa

);

// ======================================================
// POST /api/mesas
// Crear nueva mesa
// Solo ADMIN
// ======================================================

router.post(

    "/",

    verificarToken,

    verificarRol("ADMIN"),

    validarCrearMesa,

    mesasController.crearMesa

);

// ======================================================
// PUT /api/mesas/:id
// Actualizar mesa
// Solo ADMIN
// ======================================================

router.put(

    "/:id",

    verificarToken,

    verificarRol("ADMIN"),

    validarActualizarMesa,

    mesasController.actualizarMesa

);

// ======================================================
// DELETE /api/mesas/:id
// Soft Delete
// Solo ADMIN
// ======================================================

router.delete(

    "/:id",

    verificarToken,

    verificarRol("ADMIN"),

    validarIdMesa,

    mesasController.eliminarMesa

);

// ======================================================
// Exportar Router
// ======================================================

module.exports = router;