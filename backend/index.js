const express = require('express');
const { dbConeccion } = require('./dataBase/config');
require('dotenv').config()
const cors= require("cors");
const app= express();

app.listen(process.env.PORT, ()=>{
    console.log(`server corriendo en ${process.env.PORT}`)
})

dbConeccion();

app.use(cors());

app.use(express.static('public'));

app.use(express.json());

app.use("/auth",require('./routes/auth'))

app.use("/admin",require('./routes/admin'))

app.use("/tienda",require('./routes/tienda'))

app.use("/payment",require('./routes/payment'))

