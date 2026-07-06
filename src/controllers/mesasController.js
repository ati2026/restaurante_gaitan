// ======================================================
// Controlador: Mesas
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const Mesa = require("../models/mesaModel");
const response = require("../utils/response");

// ======================================================
// GET /api/mesas
// Listar todas las mesas activas
// Público
// ======================================================

const listarMesas = async (req, res) => {

    try {

        const mesas = await Mesa.obtenerTodas();

        return response.success(
            res,
            200,
            "Listado de mesas.",
            mesas
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al obtener las mesas."
        );

    }

};

// ======================================================
// GET /api/mesas/:id
// Obtener una mesa por ID
// Público
// ======================================================

const obtenerMesa = async (req, res) => {

    try {

        const { id } = req.params;

        const mesa = await Mesa.buscarPorId(id);

        if (!mesa) {

            return response.error(
                res,
                404,
                "Mesa no encontrada."
            );

        }

        return response.success(
            res,
            200,
            "Mesa encontrada.",
            mesa
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al obtener la mesa."
        );

    }

};

// ======================================================
// POST /api/mesas
// Crear mesa
// Solo ADMIN
// ======================================================

const crearMesa = async (req, res) => {

    try {

        const {

            numero,

            capacidad,

            ubicacion,

            estado

        } = req.body;

        // Validar número repetido

        const mesaExistente = await Mesa.buscarPorNumero(numero);

        if (mesaExistente) {

            return response.error(
                res,
                400,
                "Ya existe una mesa activa con ese número."
            );

        }

        const nuevaMesa = await Mesa.crearMesa({

            numero,

            capacidad,

            ubicacion,

            estado

        });

        return response.success(
            res,
            201,
            "Mesa creada correctamente.",
            nuevaMesa
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al crear la mesa."
        );

    }

};

// ======================================================
// PUT /api/mesas/:id
// Actualizar mesa
// Solo ADMIN
// ======================================================

const actualizarMesa = async (req, res) => {

    try {

        const { id } = req.params;

        const {

            numero,

            capacidad,

            ubicacion,

            estado

        } = req.body;

        // Verificar existencia

        const mesa = await Mesa.buscarPorId(id);

        if (!mesa) {

            return response.error(
                res,
                404,
                "Mesa no encontrada."
            );

        }

        // Verificar que el número no exista en otra mesa

        const existeNumero = await Mesa.buscarNumeroEnOtraMesa(

            numero,

            id

        );

        if (existeNumero) {

            return response.error(
                res,
                400,
                "Ya existe otra mesa con ese número."
            );

        }

        const mesaActualizada = await Mesa.actualizarMesa(id, {

            numero,

            capacidad,

            ubicacion,

            estado

        });

        return response.success(
            res,
            200,
            "Mesa actualizada correctamente.",
            mesaActualizada
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al actualizar la mesa."
        );

    }

};

// ======================================================
// DELETE /api/mesas/:id
// Soft Delete
// Solo ADMIN
// ======================================================

const eliminarMesa = async (req, res) => {

    try {

        const { id } = req.params;

        const mesa = await Mesa.buscarPorId(id);

        if (!mesa) {

            return response.error(
                res,
                404,
                "Mesa no encontrada."
            );

        }

        if (!mesa.activo) {

            return response.error(
                res,
                400,
                "La mesa ya se encuentra desactivada."
            );

        }

        const mesaEliminada = await Mesa.desactivarMesa(id);

        return response.success(
            res,
            200,
            "Mesa desactivada correctamente.",
            mesaEliminada
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al eliminar la mesa."
        );

    }

};

// ======================================================
// GET /api/mesas/disponibles
// Devuelve únicamente mesas disponibles
// Público
// ======================================================

const listarDisponibles = async (req, res) => {

    try {

        const mesas = await Mesa.obtenerTodas();

        const disponibles = mesas.filter(

            mesa => mesa.estado === "Disponible"

        );

        return response.success(
            res,
            200,
            "Listado de mesas disponibles.",
            disponibles
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al consultar las mesas disponibles."
        );

    }

};

// ======================================================
// Exportar controlador
// ======================================================

module.exports = {

    listarMesas,

    obtenerMesa,

    crearMesa,

    actualizarMesa,

    eliminarMesa,

    listarDisponibles

};