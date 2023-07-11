const Pedido = require('../models/pedidos-model');
const mercadopago = require("mercadopago");


const crearOrden = async (req, res) => {

    try {
        let pedido = new Pedido(req.body);
        console.log(pedido);

        const pedId = await Pedido.findById(req.body._id);

        if (pedId) {
            return res.status(404).json({
                ok: false,
                msg: 'ya existe un pedido con este Id',
            });
        } else {
            pedido = new Pedido(req.body);
            let titulo = '';

            //muestra el detalle de las cosas en el titulo
            for (const prod of pedido.menu) {
                const { name, cantidad, precio } = prod;
                titulo = titulo + '\n' + cantidad + ' ' + name + ' $' + precio + ''
            }

            //metodo de mercado pago
            mercadopago.configure({
                access_token: process.env.PROD_ACCESS_TOKEN
            });

            const resultado = await mercadopago.preferences.create({

                items: [{
                    title: titulo, // Reemplaza con la propiedad correspondiente del producto 
                    quantity: 1,  // Reemplaza con la propiedad correspondiente del producto
                    currency_id: 'ARS',       //moneda del pais
                    unit_price: pedido.precio_total,  // Reemplaza con la propiedad correspondiente del producto
                }],
                back_urls: {
                    success: "http://localhost:3000/tienda",//aqui podria llevar a una seccion en el front donde muestre un resumen o una factura generada por el negocio
                    failure: "http://localhost:3000/home",
                    pending: "http://localhost:3000/home",
                },
                auto_return: "approved",
                statement_descriptor: "MENUS",
                shipments: {
                    cost: 100, //coste de envio
                    mode: "not_specified",
                },
            });

            console.log(resultado.body.init_point)
            res.status(200).json({
                ok: true,
                msg: "orden creada y pedido guardado",
                url_comp: resultado.body.init_point,
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }
};


module.exports = {
    crearOrden,
};
