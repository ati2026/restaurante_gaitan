// ======================================================
// Controlador: Reservaciones
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const Mesa = require("../models/mesaModel");
const Reservacion = require("../models/reservacionModel");
const response = require("../utils/response");

const ESTADO_PENDIENTE = "Pendiente";
const ESTADO_CANCELADA = "Cancelada";
const ESTADO_COMPLETADA = "Completada";

const construirFechaHora = (fecha, hora) => {

    const horaNormalizada = hora.length === 5
        ? `${hora}:00`
        : hora;

    return new Date(`${fecha}T${horaNormalizada}`);

};

const crearReservacion = async (req, res) => {

    try {

        const usuario_id = req.usuario.id;

        const {
            mesa_id,
            fecha,
            hora,
            personas,
            observaciones
        } = req.body;

        const fechaHoraReservacion = construirFechaHora(fecha, hora);

        if (Number.isNaN(fechaHoraReservacion.getTime())) {

            return response.error(
                res,
                400,
                "La fecha u hora de la reservación es inválida."
            );

        }

        if (fechaHoraReservacion <= new Date()) {

            return response.error(
                res,
                400,
                "La fecha y hora de la reservación deben ser futuras."
            );

        }

        const mesa = await Mesa.buscarPorId(mesa_id);

        if (!mesa || !mesa.activo) {

            return response.error(
                res,
                404,
                "La mesa seleccionada no está disponible."
            );

        }

        if (mesa.estado === "Mantenimiento") {

            return response.error(
                res,
                400,
                "La mesa se encuentra en mantenimiento."
            );

        }

        if (personas > mesa.capacidad) {

            return response.error(
                res,
                400,
                "La cantidad de personas excede la capacidad de la mesa."
            );

        }

        const conflicto = await Reservacion.existeConflictoMesa(

            mesa_id,

            fecha,

            hora

        );

        if (conflicto) {

            return response.error(
                res,
                409,
                "La mesa ya tiene una reservación para la fecha y hora indicadas."
            );

        }

        const reservacion = await Reservacion.crearReservacion({

            usuario_id,

            mesa_id,

            fecha,

            hora,

            personas,

            estado: ESTADO_PENDIENTE,

            observaciones

        });

        return response.success(
            res,
            201,
            "Reservación creada correctamente.",
            reservacion
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al crear la reservación."
        );

    }

};

const listarMisReservaciones = async (req, res) => {

    try {

        const reservaciones = await Reservacion.obtenerPorUsuario(

            req.usuario.id

        );

        return response.success(
            res,
            200,
            "Listado de mis reservaciones.",
            reservaciones
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al obtener las reservaciones del usuario."
        );

    }

};

const listarReservaciones = async (req, res) => {

    try {

        const reservaciones = await Reservacion.obtenerTodasConFiltros(
            req.query
        );

        return response.success(
            res,
            200,
            "Listado de reservaciones.",
            reservaciones
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al obtener las reservaciones."
        );

    }

};

const cambiarEstadoReservacion = async (req, res) => {

    try {

        const { id } = req.params;
        const { estado } = req.body;

        const reservacion = await Reservacion.buscarPorId(id);

        if (!reservacion) {

            return response.error(
                res,
                404,
                "Reservación no encontrada."
            );

        }

        const reservacionActualizada = await Reservacion.actualizarEstado(

            id,

            estado

        );

        return response.success(
            res,
            200,
            "Estado de reservación actualizado correctamente.",
            reservacionActualizada
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al actualizar el estado de la reservación."
        );

    }

};

const cancelarMiReservacion = async (req, res) => {

    try {

        const { id } = req.params;

        const reservacion = await Reservacion.buscarPorId(id);

        if (!reservacion) {

            return response.error(
                res,
                404,
                "Reservación no encontrada."
            );

        }

        if (reservacion.usuario_id !== req.usuario.id) {

            return response.error(
                res,
                403,
                "No tiene permisos para cancelar esta reservación."
            );

        }

        if (reservacion.estado === ESTADO_CANCELADA) {

            return response.error(
                res,
                400,
                "La reservación ya se encuentra cancelada."
            );

        }

        if (reservacion.estado === ESTADO_COMPLETADA) {

            return response.error(
                res,
                400,
                "No se puede cancelar una reservación completada."
            );

        }

        const reservacionCancelada = await Reservacion.actualizarEstado(

            id,

            ESTADO_CANCELADA

        );

        return response.success(
            res,
            200,
            "Reservación cancelada correctamente.",
            reservacionCancelada
        );

    } catch (error) {

        console.error(error);

        return response.error(
            res,
            500,
            "Error al cancelar la reservación."
        );

    }

};

module.exports = {

    crearReservacion,

    listarMisReservaciones,

    listarReservaciones,

    cambiarEstadoReservacion,

    cancelarMiReservacion

};
