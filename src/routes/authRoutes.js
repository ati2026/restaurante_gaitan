const express = require("express");

const router = express.Router();

const authController = require("../controllers/authController");

const { verificarToken } = require("../middlewares/authMiddleware");

// ================================
// Registro
// ================================

router.post(

    "/register",

    authController.register

);

// ================================
// Login
// ================================

router.post(

    "/login",

    authController.login

);

// ================================
// Perfil
// ================================

router.get(

    "/perfil",

    verificarToken,

    authController.perfil

);

module.exports = router;