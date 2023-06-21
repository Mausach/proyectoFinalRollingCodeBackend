const Pedido = require('../models/pedidos-model');
const Producto=require('../models/producto-model');
const Usuario = require('../models/usuario-model');
const mercadopago = require("mercadopago");


const crearPedido= async (req,res)=>{
    try {

        let pedido= new Pedido(req.body);
        console.log(pedido);

        const pedId= await Pedido.findById(req.body._id);

		if (pedId) {
			return res.status(404).json({
				ok: false,
				msg: 'ya existe un pedido con este Id',
			});
		}else{

            pedido= new Pedido(req.body);

            for (const prod of pedido.menu) {
                const updated = await restarProductos(prod.id, prod.cantidad);
        
                if (!updated) {
                  return res.status(404).json({
                    ok: false,
                    msg: 'No existe ningún Producto con este Id',
                  });
                }
              }

              if(pedido.estado==='Realizado'){
                pedido.estado='Realizado';
              }
              pedido.estado='pendiente';

        await pedido.save();

        res.status(201).json({
            msg:"pedido guardado",
            id:pedido._id,
        });

        }
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"contactese con el administrador",
        })
    }
};

const restarProductos = async (id, cantidad) => {
	try {
		const productoEditar = await Producto.findById(id);

		if (!productoEditar) {
			return false
		}

		productoEditar.cantidad = productoEditar.cantidad - cantidad;

		await productoEditar.save();

		return true
	} catch (error) {
		console.log(error);
        return false
	}
};

const realizarPago=async (req,res)=>{

    try {
        let pedido= new Pedido(req.body);
        console.log(pedido);

        let preference = {
            items: [
              {
                title: pedido.menu,
                unit_price: pedido.precio_total,
                quantity: 1,
              },
            ],
            payer: {
                email: pedido.usuario,
              },
            back_urls: {
                success: "https://mode-parfum.vercel.app/success",
                failure: "https://mode-parfum.vercel.app/",
                pending: "https://mode-parfum.vercel.app/",
              },
          };

          const response =await mercadopago.preferences.create(preference)
          const preferenceId = response.body.id;
          res.send({preferenceId}); 
          res.status(201).json({
            msg:"pedido guardado",
            preferenceId:preferenceId,
            id:pedido._id,
        });


    } catch (error) {
        console.log(error)
    }

    
}

module.exports= {
    crearPedido,
    realizarPago,
}