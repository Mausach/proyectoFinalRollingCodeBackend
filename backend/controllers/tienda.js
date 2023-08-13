const Pedido = require('../models/pedidos-model');
const Producto = require('../models/producto-model');

const crearPedido = async (req, res) => {
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

      for (const prod of pedido.menu) {
        const updated = await restarProductos(prod.id, prod.cantidad);

        if (!updated) {
          return res.status(404).json({
            ok: false,
            msg: 'No existe ningún Producto con este Id',
          });
        }
      }

      if (pedido.estado === 'Realizado') {
        pedido.estado = 'Realizado';
      } else {
        pedido.estado = 'pendiente';
      }

      await pedido.save();

      res.status(201).json({
        msg: "pedido guardado",
        id: pedido._id,
      });

    }

  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: "contactese con el administrador",
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

module.exports = {
  crearPedido,
}