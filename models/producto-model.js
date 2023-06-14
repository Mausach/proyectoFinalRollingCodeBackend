const {model, Schema}=require('mongoose')

const productoSchema = Schema({
    name:{
        type: String,
        require: true,

    },

    estado:{
        type: String,
        default:"Activo",

    },

    precio:{
        type: Number,
        require: true,
    },

    url_img:{
        type: String,
        default:"https://cdn-icons-png.flaticon.com/512/1046/1046874.png"
    },

    detalle:{
        type: String,
        require: true,

    },

    categoria:{
        type: String,
        require: true,
    },

    cantidad:{
        type: Number,
        require: true,
    },

});

module.exports=model('producto',productoSchema);