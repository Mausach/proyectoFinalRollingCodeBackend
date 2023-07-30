const express = require('express');
const { crearProducto, editarProducto, eliminarProducto, cargarProducto, cargarUsuarios, cargarPedidos, confirmarPedido, inhabilitarUsuario, cargarProducto_Aleatorio } = require('../controllers/admin');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');

const { validarJWTAdmin } = require('../Midelwares/validarJwtAdmin');

const routerAdmin = express.Router();


routerAdmin.post( 
  '/new', validarJWTAdmin, [ //la ruta para crear un nuevo producto

  check("name", "el nombre es obligatorio").not().isEmpty(),
  check("precio", "el precio es obligatorio").not().isEmpty(),
  check("cantidad", "la cantidad es obligatoria").not().isEmpty(),
  check("detalle", "el detalle es obligatorio").not().isEmpty(),
  check("categoria", "la categoria es obligatoria").not().isEmpty(),
  validarCampos,



], crearProducto
);



routerAdmin.put(
  '/edit', validarJWTAdmin, [ //la ruta seria /admin/edit para editar productos

  check("name", "el nombre es obligatorio").not().isEmpty(),
  check("precio", "el precio es obligatorio").not().isEmpty(),
  check("cantidad", "la cantidad es obligatoria").not().isEmpty(),
  check("detalle", "el detalle es obligatorio").not().isEmpty(),
  check("categoria", "la categoria es obligatoria").not().isEmpty(),
  validarCampos,



], editarProducto
);

routerAdmin.delete('/eliminar/:id', validarJWTAdmin, eliminarProducto);

routerAdmin.get('/productos', cargarProducto);//no lleva validar token asi los usuarios no logueados puedan ver la tienda

routerAdmin.get('/productos/aleatorios', cargarProducto_Aleatorio);

routerAdmin.get('/usuarios', validarJWTAdmin, cargarUsuarios);

routerAdmin.get('/pedidos', validarJWTAdmin, cargarPedidos);

routerAdmin.put('/confirmar', validarJWTAdmin, confirmarPedido);

routerAdmin.put('/Deshabilitar', validarJWTAdmin, inhabilitarUsuario);


//aclaras que se exporta todo lo trabajado con router
module.exports = routerAdmin;