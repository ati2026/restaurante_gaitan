// ======================================================
// Controlador de Autenticación
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const Usuario = require("../models/usuarioModel");
const response = require("../utils/response");

// ======================================================
// Registrar nuevo usuario
// POST /api/auth/register
// ======================================================

const register = async (req, res) => {

    try {

        const {
            nombre,
            apellido,
            correo,
            password,
            telefono
        } = req.body;

        // Validar si el correo ya existe

        const usuarioExiste = await Usuario.buscarPorCorreo(correo);

        if (usuarioExiste) {

            return response.error(

                res,

                400,

                "El correo ya está registrado."

            );

        }

        // Encriptar contraseña

        const passwordHash = await bcrypt.hash(password, 10);

        const nuevoUsuario = {

            nombre,

            apellido,

            correo,

            password: passwordHash,

            telefono,

            rol_id: 2 // CLIENTE

        };

        const usuario = await Usuario.crearUsuario(nuevoUsuario);

        return response.success(

            res,

            201,

            "Usuario registrado correctamente.",

            usuario

        );

    }

    catch (error) {

        console.error(error);

        return response.error(

            res,

            500,

            "Error interno del servidor."

        );

    }

};

// ======================================================
// Login
// POST /api/auth/login
// ======================================================

const login = async (req, res) => {

    try {

        const {

            correo,

            password

        } = req.body;

        // Buscar usuario

        const usuario = await Usuario.buscarPorCorreo(correo);

        if (!usuario) {

            return response.error(

                res,

                401,

                "Correo o contraseña incorrectos."

            );

        }

        // Comparar contraseña

        const passwordCorrecto = await bcrypt.compare(

            password,

            usuario.password

        );

        if (!passwordCorrecto) {

            return response.error(

                res,

                401,

                "Correo o contraseña incorrectos."

            );

        }

        // Crear Token JWT

        const token = jwt.sign(

            {

                id: usuario.id,

                correo: usuario.correo,

                rol: usuario.rol

            },

            process.env.JWT_SECRET,

            {

                expiresIn: process.env.JWT_EXPIRES

            }

        );

        // No devolver password

        delete usuario.password;

        return res.status(200).json({

            ok: true,

            mensaje: "Inicio de sesión exitoso.",

            token,

            usuario

        });

    }

    catch (error) {

        console.error(error);

        return response.error(

            res,

            500,

            "Error interno del servidor."

        );

    }

};

// ======================================================
// Perfil del usuario autenticado
// GET /api/auth/perfil
// ======================================================

const perfil = async (req, res) => {

    try {

        // req.usuario viene del Middleware JWT

        const usuario = await Usuario.buscarPorId(

            req.usuario.id

        );

        if (!usuario) {

            return response.error(

                res,

                404,

                "Usuario no encontrado."

            );

        }

        return response.success(

            res,

            200,

            "Perfil obtenido correctamente.",

            usuario

        );

    }

    catch (error) {

        console.error(error);

        return response.error(

            res,

            500,

            "Error interno del servidor."

        );

    }

};

// ======================================================
// Exportar
// ======================================================

module.exports = {

    register,

    login,

    perfil

};

// ======================================================
// JSON de registro de usuario
// {
// "nombre":"Carlos",
// "apellido":"Pérez",
// "correo":"carlos@gmail.com",
// "password":"123456",
// "telefono":"77778888"
// }
// ======================================================