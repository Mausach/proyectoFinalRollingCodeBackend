const Pedido = require('../models/pedidos-model');
const mercadopago = require("mercadopago");


const crearOrden = async (req, res) => {

    try {
        let pedido = new Pedido(req.body);
        

        const pedId = await Pedido.findById(req.body._id);

        if (pedId) {
            return res.status(404).json({
                ok: false,
                msg: 'ya existe un pedido con este Id',
            });
        } else {
            pedido = new Pedido(req.body);
            let titulo = '';

            
            for (const prod of pedido.menu) {
                const { name, cantidad, precio } = prod;
                titulo = titulo + '\n' + cantidad + ' ' + name + ' $' + precio + ''
            }

            
            mercadopago.configure({
                access_token: process.env.PROD_ACCESS_TOKEN
            });

            const resultado = await mercadopago.preferences.create({

                items: [{
                    title: titulo, 
                    quantity: 1,  
                    currency_id: 'ARS',       
                    unit_price: pedido.precio_total,  o
                }],
                back_urls: {
                    success: "https://el-buen-comer.netlify.app/tienda",
                    failure: "https://el-buen-comer.netlify.app/",
                    pending: "https://el-buen-comer.netlify.app/",
                },
                auto_return: "approved",
                statement_descriptor: "MENUS",
                shipments: {
                    cost: 100, 
                    mode: "not_specified",
                },
            });

            
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
