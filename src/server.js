// src/server.js

require("dotenv").config();

const app = require("./app");

// Importar conexión
require("./config/database");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("======================================");
    console.log("🚀 Servidor iniciado correctamente");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("======================================");

});