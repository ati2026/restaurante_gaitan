// =====================================================
// Middleware de Autenticación JWT
// Restaurante Las Carnitas de Don Gaitán
// =====================================================

const jwt = require("jsonwebtoken");

// =====================================================
// Verificar Token JWT
// =====================================================

const verificarToken = (req, res, next) => {

    try {

        // Leer encabezado Authorization

        const authorization = req.headers.authorization;

        // Verificar si existe

        if (!authorization) {

            return res.status(401).json({

                ok: false,

                mensaje: "Acceso denegado. No se proporcionó un token."

            });

        }

        // Verificar formato Bearer TOKEN

        const partes = authorization.split(" ");

        if (partes.length !== 2 || partes[0] !== "Bearer") {

            return res.status(401).json({

                ok: false,

                mensaje: "Formato del token incorrecto."

            });

        }

        // Obtener únicamente el JWT

        const token = partes[1];

        // Verificar Token

        const decoded = jwt.verify(

            token,

            process.env.JWT_SECRET

        );

        // Guardar usuario autenticado

        req.usuario = {

            id: decoded.id,

            correo: decoded.correo,

            rol: decoded.rol

        };

        next();

    }

    catch (error) {

        if (error.name === "TokenExpiredError") {

            return res.status(401).json({

                ok: false,

                mensaje: "El token ha expirado."

            });

        }

        if (error.name === "JsonWebTokenError") {

            return res.status(401).json({

                ok: false,

                mensaje: "Token inválido."

            });

        }

        return res.status(500).json({

            ok: false,

            mensaje: "Error al verificar el token."

        });

    }

};

// =====================================================
// Exportar
// =====================================================

module.exports = {

    verificarToken

};