const express = require('express');
const { crearProducto, editarProducto, eliminarProducto, cargarProducto, cargarUsuarios, cargarPedidos, confirmarPedido, inhabilitarUsuario, cargarProducto_Aleatorio } = require('../controllers/admin');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');
const { validarJWT } = require('../Midelwares/validarJwt');

const routerAdmin = express.Router();


routerAdmin.post(
  '/new', validarJWT, [

  check("name", "el nombre es obligatorio").not().isEmpty(),
  check("precio", "el precio es obligatorio").not().isEmpty(),
  check("cantidad", "la cantidad es obligatoria").not().isEmpty(),
  check("detalle", "el detalle es obligatorio").not().isEmpty(),
  check("categoria", "la categoria es obligatoria").not().isEmpty(),
  validarCampos,



], crearProducto
);



routerAdmin.put(
  '/edit', validarJWT, [ //la ruta seria /admin/edit para editar productos

  check("name", "el nombre es obligatorio").not().isEmpty(),
  check("precio", "el precio es obligatorio").not().isEmpty(),
  check("cantidad", "la cantidad es obligatoria").not().isEmpty(),
  check("detalle", "el detalle es obligatorio").not().isEmpty(),
  check("categoria", "la categoria es obligatoria").not().isEmpty(),
  validarCampos,



], editarProducto
);

routerAdmin.delete('/eliminar/:id', validarJWT, eliminarProducto);

routerAdmin.get('/productos', cargarProducto);//no lleva validar token asi los usuarios no logueados puedan ver la tienda

routerAdmin.get('/productos/aleatorios', cargarProducto_Aleatorio);

routerAdmin.get('/usuarios', validarJWT, cargarUsuarios);

routerAdmin.get('/pedidos', validarJWT, cargarPedidos);

routerAdmin.put('/confirmar', validarJWT, confirmarPedido);

routerAdmin.put('/Deshabilitar', validarJWT, inhabilitarUsuario);


//aclaras que se exporta todo lo trabajado con router
module.exports = routerAdmin;