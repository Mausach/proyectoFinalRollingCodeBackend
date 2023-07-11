const express = require('express');
const { crearOrden, completado, verificarPago, } = require('../controllers/payment');
const { validarJWT } = require('../Midelwares/validarJwt');

const routerPayment = express.Router();

routerPayment.post('/crear-orden', validarJWT, crearOrden);

//routerPayment.get('/webhook', webHook);


module.exports = routerPayment;