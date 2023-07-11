const express = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');
const { crearPedido, realizarPago } = require('../controllers/tienda');
const { validarJWT } = require('../Midelwares/validarJwt');

const routerTienda = express.Router();

routerTienda.post(
  '/new', validarJWT, [

  check("usuario", "el nombre o meil es obligatorio").not().isEmpty(),
  check("menu", "el o los menus son obligatorios").not().isEmpty(),
  check("precio_total", "el precio es obligatoria").not().isEmpty(),
  validarCampos
], crearPedido
);

module.exports = routerTienda;