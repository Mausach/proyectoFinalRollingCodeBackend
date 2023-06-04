const {model, Schema}=require('mongoose')

const usuarioSchema = Schema({//aquia claramos los datos que se van a tomar
    name:{
        type: String,
        require: true,

    },
    email:{
        type: String,
        require: true,
        unique:true,
    },

    password:{
        type:String,
        require:true,
    },

    rol:{
        type: String,
        default:'usuario',
    },

    

});

module.exports=model('Usuario',usuarioSchema);