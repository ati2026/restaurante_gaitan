// src/app.js

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const app = express();

// Middlewares

app.use(cors());

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

// Ruta de prueba

app.get("/", (req, res) => {

    res.json({
        mensaje: "API Restaurante Las Carnitas de Don Gaitán funcionando correctamente"
    });

});

module.exports = app;