// src/config/database.js

const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

pool.connect((error, client, release) => {

    if (error) {
        console.error("❌ Error al conectar con PostgreSQL");
        console.error(error.message);
        return;
    }

    console.log("✅ Conexión exitosa a PostgreSQL");

    release();

});

module.exports = pool;