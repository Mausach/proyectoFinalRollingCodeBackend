const {model, Schema}=require('mongoose')

const productoSchema = Schema({//aquia claramos los datos que se van a tomar
    name:{
        type: String,
        require: true,

    },
    precio:{
        type: String,
        require: true,
    },

    cantidad:{
        type: Number,
        require: true,
    },

});

module.exports=model('producto',productoSchema);