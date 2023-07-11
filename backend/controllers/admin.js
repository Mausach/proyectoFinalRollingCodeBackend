const Producto = require('../models/producto-model');
const Usuario = require('../models/usuario-model');
const Pedido = require('../models/pedidos-model')

const crearProducto = async (req, res) => {
    const { name } = req.body;//extrae los datos que enviamos desde el front

    try {

        let producto = new Producto(req.body);
        console.log(producto);

        let product = await Producto.findOne({ name })

        if (product) {
            return res.status(400).json({
                ok: false,
                msg: "el producto ya existe"
            })
        }
        product = new Producto(req.body);

        await product.save();

        res.status(201).json({
            msg: "producto guardado",
            id: producto._id,
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }
};

const editarProducto = async (req, res) => {
    //aqui va la logica de editar producto

    try {
        const productoEditar = await Producto.findById(req.body._id);

        if (!productoEditar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Producto con este Id',
            });
        }

        await Producto.findByIdAndUpdate(req.body._id, req.body);

        res.status(200).json({
            ok: true,
            msg: 'Menu editado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};

const eliminarProducto = async (req, res) => {

    //aqui va la logica de eliminar producto

    try {
        const productoEliminar = await Producto.findById(req.params.id);

        if (!productoEliminar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe un producto con este ID',
            });
        }

        await Producto.findByIdAndDelete(req.params.id);

        res.status(200).json({
            ok: true,
            msg: 'Producto Eliminado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};

const confirmarPedido = async (req, res) => {
    try {
        const pedidoConfirmar = await Pedido.findById(req.body._id);

        if (!pedidoConfirmar) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun Producto con este Id',
            });
        }

        pedidoConfirmar.estado = 'Realizado';

        await pedidoConfirmar.save();

        res.status(200).json({
            ok: true,
            msg: 'pedido confirmado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};


const inhabilitarUsuario = async (req, res) => {

    try {
        const usuarioInactivo = await Usuario.findById(req.body._id);

        if (!usuarioInactivo) {
            return res.status(404).json({
                ok: false,
                msg: 'No existe ningun usuario con este Id',
            });
        }

        usuarioInactivo.estado = 'Inactivo';

        await usuarioInactivo.save();

        res.status(200).json({
            ok: true,
            msg: 'usuario deshabilitado',
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'hable con el administrador',
        });
    }
};


const cargarProducto = async (req, res) => {

    try {

        //el find sirve para recorrer en la base de dato todos los productos llevandose des esquema importado
        const productos = await Producto.find();

        res.status(200).json({
            ok: true,
            msg: "productos cargados",
            productos,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }

};

const cargarProducto_Aleatorio = async (req, res) => {

    try {

        //el find sirve para recorrer en la base de dato todos los productos llevandose des esquema importado
        const productos = await Producto.aggregate([{ $sample: { size: 3 } }]);

        res.status(200).json({
            ok: true,
            msg: "productos cargados",
            productos,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }
};

const cargarUsuarios = async (req, res) => {

    try {

        const usuarios = await Usuario.find();

        res.status(200).json({
            ok: true,
            msg: "usuarios cargados",
            usuarios,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }
};

const cargarPedidos = async (req, res) => {

    try {

        //el find sirve para recorrer en la base de dato todos los productos llevandose des esquema importado
        const pedidos = await Pedido.find();

        res.status(200).json({
            ok: true,
            msg: "pedidos cargados",
            pedidos,

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: "contactese con el administrador",
        })
    }

};

module.exports = {
    crearProducto,
    editarProducto,
    eliminarProducto,
    cargarProducto,
    cargarUsuarios,
    cargarPedidos,
    confirmarPedido,
    inhabilitarUsuario,
    cargarProducto_Aleatorio
};