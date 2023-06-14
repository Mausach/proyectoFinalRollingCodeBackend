const {model, Schema}=require('mongoose');

const pedidosSchema = Schema({
    usuario:{
        type: String,
        require: true,

    },
    fecha:{
        type: String,
        default:'que se yo'
    },

    menu:{
        type:String,
        require:true,
    },

    estado:{
        type:String,
        default:'pendiente',
    },

});

module.exports=model('Pedido',pedidosSchema);