const express = require("express");

const cors = require("cors");

const helmet = require("helmet");

const morgan = require("morgan");

const app = express();

// Middlewares

app.use(cors());

app.use(helmet());

app.use(express.json());

app.use(express.urlencoded({

    extended: true

}));

app.use(morgan("dev"));

// ========================================
// Rutas
// ========================================

app.use(

    "/api/auth",

    require("./routes/authRoutes")

);

app.use(

    "/api/mesas",

    require("./routes/mesasRoutes")

);

app.use(

    "/api/reservaciones",

    require("./routes/reservacionesRoutes")

);

// Ruta principal

app.get("/", (req, res) => {

    res.json({

        mensaje: "API Restaurante Las Carnitas de Don Gaitán"

    });

});

module.exports = app;
