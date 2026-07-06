// ======================================================
// Modelo: Mesas
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const db = require("../config/database");

// ======================================================
// Obtener todas las mesas activas
// ======================================================

const obtenerTodas = async () => {

    try {

        const sql = `
            SELECT
                id,
                numero,
                capacidad,
                ubicacion,
                estado,
                activo
            FROM mesas
            WHERE activo = true
            ORDER BY numero ASC
        `;

        const resultado = await db.query(sql);

        return resultado.rows;

    } catch (error) {

        throw error;

    }

};

// ======================================================
// Buscar mesa por ID
// ======================================================

const buscarPorId = async (id) => {

    try {

        const sql = `
            SELECT
                id,
                numero,
                capacidad,
                ubicacion,
                estado,
                activo
            FROM mesas
            WHERE id = $1
        `;

        const resultado = await db.query(sql, [id]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

// ======================================================
// Buscar una mesa activa por número
// Se utiliza al crear una nueva mesa
// ======================================================

const buscarPorNumero = async (numero) => {

    try {

        const sql = `
            SELECT *
            FROM mesas
            WHERE numero = $1
            AND activo = true
        `;

        const resultado = await db.query(sql, [numero]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

// ======================================================
// Verificar si otro registro ya usa ese número
// Se utiliza al actualizar una mesa
// ======================================================

const buscarNumeroEnOtraMesa = async (numero, id) => {

    try {

        const sql = `
            SELECT *
            FROM mesas
            WHERE numero = $1
            AND id <> $2
            AND activo = true
        `;

        const resultado = await db.query(sql, [

            numero,

            id

        ]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

// ======================================================
// Crear mesa
// ======================================================

const crearMesa = async (mesa) => {

    try {

        const sql = `
            INSERT INTO mesas
            (
                numero,
                capacidad,
                ubicacion,
                estado
            )
            VALUES
            (
                $1,
                $2,
                $3,
                $4
            )
            RETURNING *
        `;

        const valores = [

            mesa.numero,

            mesa.capacidad,

            mesa.ubicacion,

            mesa.estado || "Disponible"

        ];

        const resultado = await db.query(sql, valores);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

// ======================================================
// Actualizar mesa
// ======================================================

const actualizarMesa = async (id, mesa) => {

    try {

        const sql = `
            UPDATE mesas
            SET

                numero = $1,

                capacidad = $2,

                ubicacion = $3,

                estado = $4

            WHERE id = $5

            RETURNING *
        `;

        const valores = [

            mesa.numero,

            mesa.capacidad,

            mesa.ubicacion,

            mesa.estado,

            id

        ];

        const resultado = await db.query(sql, valores);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

// ======================================================
// Desactivar mesa (Soft Delete)
// ======================================================

const desactivarMesa = async (id) => {

    try {

        const sql = `
            UPDATE mesas
            SET activo = false
            WHERE id = $1
            RETURNING *
        `;

        const resultado = await db.query(sql, [id]);

        return resultado.rows[0];

    } catch (error) {

        throw error;

    }

};

// ======================================================
// Exportar
// ======================================================

module.exports = {

    obtenerTodas,

    buscarPorId,

    buscarPorNumero,

    buscarNumeroEnOtraMesa,

    crearMesa,

    actualizarMesa,

    desactivarMesa

};