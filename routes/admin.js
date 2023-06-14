const express = require('express');
const { crearProducto, editarProducto, eliminarProducto, cargarProducto, cargarUsuarios, cargarPedidos, confirmarPedido, inhabilitarUsuario } = require('../controllers/admin');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');

const routerAdmin=express.Router();


routerAdmin.post(
  '/new',[ 

    check("name","el nombre es obligatorio").not().isEmpty(),
       check("precio","el precio es obligatorio").not().isEmpty(),
         check("cantidad","la cantidad es obligatoria").not().isEmpty(),
          check("detalle","el detalle es obligatorio").not().isEmpty(),
            check("categoria","la categoria es obligatoria").not().isEmpty(),
               validarCampos,

                

], crearProducto
);



routerAdmin.put(
  '/edit',[ //la ruta seria /admin/edit para editar productos

  check("name","el nombre es obligatorio").not().isEmpty(),
       check("precio","el precio es obligatorio").not().isEmpty(),
         check("cantidad","la cantidad es obligatoria").not().isEmpty(),
          check("detalle","el detalle es obligatorio").not().isEmpty(),
            check("categoria","la categoria es obligatoria").not().isEmpty(),
               validarCampos,

              

], editarProducto
);

routerAdmin.delete('/eliminar/:id', eliminarProducto);

routerAdmin.get( '/productos', cargarProducto);

routerAdmin.get( '/usuarios', cargarUsuarios);

routerAdmin.get( '/pedidos', cargarPedidos);

routerAdmin.put('/confirmar', confirmarPedido);

routerAdmin.put('/Deshabilitar', inhabilitarUsuario);


//aclaras que se exporta todo lo trabajado con router
module.exports=routerAdmin;