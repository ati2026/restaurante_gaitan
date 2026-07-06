require("dotenv").config();

const app = require("./app");

// Conectar PostgreSQL

require("./config/database");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log("");

    console.log("===============================");

    console.log("Servidor iniciado correctamente");

    console.log(`Puerto: ${PORT}`);

    console.log("===============================");

});