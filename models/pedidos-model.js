const { model, Schema } = require('mongoose');

const pedidosSchema = Schema({
    usuario: {
        type: String,
        require: true,

    },
    fecha: {
        type: String,
        require: true,
    },

    hora: {
        type: String,
        require: true,
    },

    menu: {
        type: [
            {
                id: { type: String, required: true },
                cantidad: { type: Number, required: true },
                name: { type: String, required: true },
                precio: { type: Number, required: true },
            },
        ],
        required: true,
    },

    precio_total: {
        type: Number,
        require: true,
    },

    estado: {
        type: String,
        default: 'pendiente',
    },

});

module.exports = model('Pedido', pedidosSchema);