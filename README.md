# El Buen Comer  - SPA (Deployado y Responsivo)

► Deploy Frontendhttps: //el-buen-comer-back.onrender.com

Tecnologías necesarias:
* React
* Node
* Express
* MongoDB
* mongoose

#### Backend

Servidor en Node/Express con las siguientes rutas:

* POST https://el-buen-comer-back.onrender.com/auth/new
    - para crear usuario.
      
* POST https://el-buen-comer-back.onrender.com/auth/login
    - para logear usuario.

* POST https://el-buen-comer-back.onrender.com/auth/validar_email
    - para verificar si el email para restablecer es valido.
 
* PUT https://el-buen-comer-back.onrender.com/auth/Restablecer
    - para restablecer la contraseña.
 
* POST https://el-buen-comer-back.onrender.com/admin/new
    - para crear un nuevo menu.
 
* POST https://el-buen-comer-back.onrender.com/admin/new
    - para crear un nuevo menu.
 
* PUT https://el-buen-comer-back.onrender.com/admin/edit
    - para editar un menu.
 
* GET https://el-buen-comer-back.onrender.com/admin/productos
    - para cargar los menus.
 
* GET https://el-buen-comer-back.onrender.com/admin/productos/aleatorios
    - para cargar los menus aleaterios para el home.
 
* GET https://el-buen-comer-back.onrender.com/admin/usuarios
    - para cargar los usuarios.
                 
* GET https://el-buen-comer-back.onrender.com/admin/pedidos
    - para cargar los pedidos.
 
* PUT https://el-buen-comer-back.onrender.com/admin/confirmar
    - para confirmar los pedidos a realizado.
 
* PUT https://el-buen-comer-back.onrender.com/admin/Deshabilitar
    - para deshabilitar a un usuario.
 
* POST https://el-buen-comer-back.onrender.com/Payment/crear-orden
    - para crear orden de pago de MERCADOPAGO.
 
* POST https://el-buen-comer-back.onrender.com/tienda/new
    - para crear un pedido.
                        
 #### Base de datos

Los modelo de la base de datos:

- [ ] usuario:
  - _id (unico para cada usuario) *
  - name *
  - email
  - password
  - estado
  - rol
    
- [ ] producto:
  - _id (unico para cada menu)
  - name
  - estado
  - precio
  - url_img
  - detalle
  - categoria
  - cantidad
     
- [ ] pedidos:
  - _id (unico para cada pedido)
  - usuario
  - fecha
  - hora
  - menu
  - precio_total
  - estado

    
