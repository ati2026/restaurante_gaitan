// ======================================================
// Middleware de Roles
// Restaurante Las Carnitas de Don Gaitán
// ======================================================

/**
 * Permite el acceso únicamente a los roles indicados.
 *
 * Ejemplo:
 * verificarRol("ADMIN")
 *
 * o
 *
 * verificarRol("ADMIN", "CLIENTE")
 */

const verificarRol = (...rolesPermitidos) => {

    return (req, res, next) => {

        try {

            // Verificar que el middleware JWT ya haya autenticado al usuario

            if (!req.usuario) {

                return res.status(401).json({

                    ok: false,

                    mensaje: "Usuario no autenticado."

                });

            }

            // Validar que el rol tenga permisos

            if (!rolesPermitidos.includes(req.usuario.rol)) {

                return res.status(403).json({

                    ok: false,

                    mensaje: "No tiene permisos para acceder a este recurso."

                });

            }

            next();

        }

        catch (error) {

            console.error(error);

            return res.status(500).json({

                ok: false,

                mensaje: "Error al verificar permisos."

            });

        }

    };

};

module.exports = {

    verificarRol

};