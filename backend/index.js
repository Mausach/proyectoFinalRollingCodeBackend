const express = require('express');
const { dbConeccion } = require('./dataBase/config');
require('dotenv').config()
const cors= require("cors");
const app= express();


//llamar al servidor
app.listen(process.env.PORT, ()=>{
    console.log(`server corriendo en ${process.env.PORT}`)
})

//base de datos
dbConeccion();

//cors
app.use(cors());

//directorio publico
app.use(express.static('public'));

//lectura y parseo del body
app.use(express.json());

//midelwars son procesos que se van a correr durante la ejecucion
app.use("/auth",require('./routes/auth'))

//para el admin
app.use("/admin",require('./routes/admin'))

//para la tienda en este caso de menus
app.use("/tienda",require('./routes/tienda'))

//para aplicar mercadopago
app.use("/payment",require('./routes/payment'))


//app.listen(process.env.PORT),()=>{
  //  console.log('server corriendo en puerto 4k');
//};