const express = require('express');
const { crearProducto, editarProducto, eliminarProducto, cargarProducto } = require('../controllers/admin');

const { check } = require('express-validator');
const { validarCampos } = require('../Midelwares/validarCampos');

const routerAdmin=express.Router();


routerAdmin.post(
  '/new',[ 

    check("name","el nombre es obligatorio").not().isEmpty(),
       check("precio","el precio es obligatorio").not().isEmpty(),
         check("cantidad","la cantidad es obligatoria").not().isEmpty(),
               validarCampos,

                

], crearProducto
);

routerAdmin.put(
  '/edit',[ //la ruta seria /admin/edit para editar productos

  check("name","el nombre es obligatorio").not().isEmpty(),
     check("precio","el precio es obligatorio").not().isEmpty(),
       check("cantidad","la cantidad es obligatoria").not().isEmpty(),
             validarCampos,

              

], editarProducto
);

routerAdmin.delete(
  '/delete',[ //la ruta seria /admin/delete para borrar productos

  check("name","el nombre es obligatorio").not().isEmpty(),
     check("precio","el precio es obligatorio").not().isEmpty(),
       check("cantidad","la cantidad es obligatoria").isEmpty(),
             validarCampos,

              

], eliminarProducto
)

routerAdmin.get( '/', cargarProducto);


//aclaras que se exporta todo lo trabajado con router
module.exports=routerAdmin;