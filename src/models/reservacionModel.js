// ======================================================
// Modelo: Reservaciones
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const db = require("../config/database");

const buscarPorId = async (id) => {

    try {

        const sql = `
            SELECT
                r.id,
                r.usuario_id,
                r.mesa_id,
                r.fecha,
                r.hora,
                r.personas,
                r.estado,
                r.observaciones,
                r.created_at,
                u.nombre,
                u.apellido,
                u.correo,
                m.numero AS mesa_numero,
                m.capacidad AS mesa_capacidad,
                m.ubicacion AS mesa_ubicacion
            FROM reservaciones r
            INNER JOIN usuarios u
                ON u.id = r.usuario_id
            INNER JOIN mesas m
                ON m.id = r.mesa_id
            WHERE r.id = $1
        `;

        const resultado = await db.query(sql, [id]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

const existeConflictoMesa = async (mesaId, fecha, hora) => {

    try {

        const sql = `
            SELECT id
            FROM reservaciones
            WHERE mesa_id = $1
              AND fecha = $2
              AND hora = $3
              AND estado <> 'Cancelada'
            LIMIT 1
        `;

        const resultado = await db.query(sql, [

            mesaId,

            fecha,

            hora

        ]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

const crearReservacion = async (reservacion) => {

    try {

        const sql = `
            INSERT INTO reservaciones
            (
                usuario_id,
                mesa_id,
                fecha,
                hora,
                personas,
                estado,
                observaciones
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6,
                $7
            )
            RETURNING
                id,
                usuario_id,
                mesa_id,
                fecha,
                hora,
                personas,
                estado,
                observaciones,
                created_at
        `;

        const valores = [

            reservacion.usuario_id,

            reservacion.mesa_id,

            reservacion.fecha,

            reservacion.hora,

            reservacion.personas,

            reservacion.estado,

            reservacion.observaciones || null

        ];

        const resultado = await db.query(sql, valores);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

const obtenerPorUsuario = async (usuarioId) => {

    try {

        const sql = `
            SELECT
                r.id,
                r.usuario_id,
                r.mesa_id,
                r.fecha,
                r.hora,
                r.personas,
                r.estado,
                r.observaciones,
                r.created_at,
                m.numero AS mesa_numero,
                m.capacidad AS mesa_capacidad,
                m.ubicacion AS mesa_ubicacion
            FROM reservaciones r
            INNER JOIN mesas m
                ON m.id = r.mesa_id
            WHERE r.usuario_id = $1
            ORDER BY r.fecha DESC, r.hora DESC, r.id DESC
        `;

        const resultado = await db.query(sql, [usuarioId]);

        return resultado.rows;

    } catch (error) {

        throw error;

    }

};

const obtenerTodasConFiltros = async (filtros = {}) => {

    try {

        const condiciones = [];
        const valores = [];

        if (filtros.estado) {

            valores.push(filtros.estado);
            condiciones.push(`r.estado = $${valores.length}`);

        }

        if (filtros.fecha) {

            valores.push(filtros.fecha);
            condiciones.push(`r.fecha = $${valores.length}`);

        }

        if (filtros.desde) {

            valores.push(filtros.desde);
            condiciones.push(`r.fecha >= $${valores.length}`);

        }

        if (filtros.hasta) {

            valores.push(filtros.hasta);
            condiciones.push(`r.fecha <= $${valores.length}`);

        }

        if (filtros.mesa_id) {

            valores.push(filtros.mesa_id);
            condiciones.push(`r.mesa_id = $${valores.length}`);

        }

        if (filtros.usuario_id) {

            valores.push(filtros.usuario_id);
            condiciones.push(`r.usuario_id = $${valores.length}`);

        }

        const where = condiciones.length
            ? `WHERE ${condiciones.join(" AND ")}`
            : "";

        const sql = `
            SELECT
                r.id,
                r.usuario_id,
                r.mesa_id,
                r.fecha,
                r.hora,
                r.personas,
                r.estado,
                r.observaciones,
                r.created_at,
                u.nombre,
                u.apellido,
                u.correo,
                m.numero AS mesa_numero,
                m.capacidad AS mesa_capacidad,
                m.ubicacion AS mesa_ubicacion
            FROM reservaciones r
            INNER JOIN usuarios u
                ON u.id = r.usuario_id
            INNER JOIN mesas m
                ON m.id = r.mesa_id
            ${where}
            ORDER BY r.fecha DESC, r.hora DESC, r.id DESC
        `;

        const resultado = await db.query(sql, valores);

        return resultado.rows;

    } catch (error) {

        throw error;

    }

};

const actualizarEstado = async (id, estado) => {

    try {

        const sql = `
            UPDATE reservaciones
            SET estado = $1
            WHERE id = $2
            RETURNING
                id,
                usuario_id,
                mesa_id,
                fecha,
                hora,
                personas,
                estado,
                observaciones,
                created_at
        `;

        const resultado = await db.query(sql, [

            estado,

            id

        ]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

module.exports = {

    buscarPorId,

    existeConflictoMesa,

    crearReservacion,

    obtenerPorUsuario,

    obtenerTodasConFiltros,

    actualizarEstado

};
