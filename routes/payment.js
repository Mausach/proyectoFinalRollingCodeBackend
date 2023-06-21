const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');
const { crearOrden, completado, verificarPago,  } = require('../controllers/payment');

const routerPayment= express.Router();

routerPayment.post('/crear-orden', crearOrden);

routerPayment.get('/success', completado);
routerPayment.get('/failure', completado);
routerPayment.get('/pending', completado);

routerPayment.post('/webhook', verificarPago);

//routerPayment.get('/webhook', webHook);


module.exports=routerPayment;