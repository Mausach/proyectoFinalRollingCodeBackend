const express = require('express');
const { crearUsuario, loginUsuario, validarCorreo, RestablecerPassword } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');
const routerAuth = express.Router();


routerAuth.post('/new', [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").not().isEmpty(),
    check("password", "la pasword debe ser de minimo 5").isLength({
        min: 5,
    }),
    validarCampos
], crearUsuario);


routerAuth.post('/login',
    [ 

        check("email", "el email es obligatorio").not().isEmpty(),
        check("password", "la pasword es obligatoria").not().isEmpty(),
        validarCampos

    ], loginUsuario);


routerAuth.post('/validar_email',
    [ 

        check("email", "el email es obligatorio").not().isEmpty(),
        validarCampos

    ], validarCorreo);


routerAuth.put('/Restablecer', [

    check("email", "el email es obligatorio").not().isEmpty(),
    check("password", "la pasword es obligatoria").not().isEmpty(),
    validarCampos

], RestablecerPassword);


module.exports = routerAuth;
