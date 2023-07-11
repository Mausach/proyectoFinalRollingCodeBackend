const express = require('express');
const { crearUsuario, loginUsuario, validarCorreo, RestablecerPassword } = require('../controllers/auth');
const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');
const routerAuth = express.Router();

//para crear usuario
routerAuth.post('/new', [
    check("name", "el nombre es obligatorio").not().isEmpty(),
    check("email", "el email es obligatorio").not().isEmpty(),
    check("password", "la pasword debe ser de minimo 5").isLength({
        min: 5,
    }),
    validarCampos
], crearUsuario);

//para logear usuario
routerAuth.post('/login',
    [ //cuando usamos varios midelwar van dentro de corchetes verifican que los campos existan y despues va recien el validar

        check("email", "el email es obligatorio").not().isEmpty(),
        check("password", "la pasword es obligatoria").not().isEmpty(),
        validarCampos

    ], loginUsuario);


//para enviar email
routerAuth.post('/validar_email',
    [ //cuando usamos varios midelwar van dentro de corchetes verifican que los campos existan y despues va recien el validar

        check("email", "el email es obligatorio").not().isEmpty(),
        validarCampos

    ], validarCorreo);

//para restablecer la contraseña
routerAuth.put('/Restablecer', [

    check("email", "el email es obligatorio").not().isEmpty(),
    check("password", "la pasword es obligatoria").not().isEmpty(),
    validarCampos

], RestablecerPassword);


module.exports = routerAuth;
