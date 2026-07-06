// ======================================================
// Modelo: Usuario
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const db = require("../config/database");

/**
 * Buscar usuario por correo electrónico
 * Se utiliza durante el Login
 */
const buscarPorCorreo = async (correo) => {

    try {

        const sql = `
            SELECT
                u.id,
                u.nombre,
                u.apellido,
                u.correo,
                u.password,
                u.telefono,
                u.estado,
                u.created_at,
                r.id AS rol_id,
                r.nombre AS rol
            FROM usuarios u
            INNER JOIN roles r
                ON u.rol_id = r.id
            WHERE u.correo = $1
              AND u.estado = true
        `;

        const resultado = await db.query(sql, [correo]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};


/**
 * Buscar usuario por ID
 * Se utiliza para obtener el perfil del usuario autenticado
 */
const buscarPorId = async (id) => {

    try {

        const sql = `
            SELECT
                u.id,
                u.nombre,
                u.apellido,
                u.correo,
                u.telefono,
                u.estado,
                u.created_at,
                r.nombre AS rol
            FROM usuarios u
            INNER JOIN roles r
                ON u.rol_id = r.id
            WHERE u.id = $1
        `;

        const resultado = await db.query(sql, [id]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};


/**
 * Crear un nuevo usuario
 * El password ya debe venir encriptado con bcrypt
 */
const crearUsuario = async (usuario) => {

    try {

        const sql = `
            INSERT INTO usuarios
            (
                nombre,
                apellido,
                correo,
                password,
                telefono,
                rol_id
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4,
                $5,
                $6
            )
            RETURNING
                id,
                nombre,
                apellido,
                correo,
                telefono,
                rol_id,
                created_at
        `;

        const valores = [

            usuario.nombre,
            usuario.apellido,
            usuario.correo,
            usuario.password,
            usuario.telefono,
            usuario.rol_id

        ];

        const resultado = await db.query(sql, valores);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};


/**
 * Obtener todos los usuarios
 * Solo para administrador
 */
const obtenerTodos = async () => {

    try {

        const sql = `
            SELECT

                u.id,

                u.nombre,

                u.apellido,

                u.correo,

                u.telefono,

                u.estado,

                r.nombre AS rol

            FROM usuarios u

            INNER JOIN roles r

                ON u.rol_id = r.id

            ORDER BY u.id ASC
        `;

        const resultado = await db.query(sql);

        return resultado.rows;

    } catch (error) {

        throw error;

    }

};


/**
 * Actualizar información del usuario
 */
const actualizarUsuario = async (id, usuario) => {

    try {

        const sql = `
            UPDATE usuarios
            SET

                nombre=$1,

                apellido=$2,

                telefono=$3

            WHERE id=$4

            RETURNING
                id,
                nombre,
                apellido,
                correo,
                telefono
        `;

        const valores = [

            usuario.nombre,

            usuario.apellido,

            usuario.telefono,

            id

        ];

        const resultado = await db.query(sql, valores);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};


/**
 * Desactivar usuario (Soft Delete)
 */
const eliminarUsuario = async (id) => {

    try {

        const sql = `
            UPDATE usuarios
            SET estado = false
            WHERE id = $1
        `;

        await db.query(sql, [id]);

        return true;

    } catch (error) {

        throw error;

    }

};


// ======================================================
// Exportar funciones
// ======================================================

module.exports = {

    buscarPorCorreo,

    buscarPorId,

    crearUsuario,

    obtenerTodos,

    actualizarUsuario,

    eliminarUsuario

};