const jwt = require("jsonwebtoken");

const generarJWT = (usuario) => {

    return jwt.sign(

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

};

module.exports = {

    generarJWT

};