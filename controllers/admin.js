const Producto=require('../models/producto-model');

const crearProducto= async (req,res)=>{
    const {name,precio,cantidad}=req.body;//extrae los datos que enviamos desde el front
    
    try {

        let producto= new Producto(req.body);
        console.log(producto);
        await producto.save();



        res.status(201).json({
            msg:"producto cargado",
            id:producto._id,
        });
        

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg:"contactese con el administrador",
        })
    }



};

const editarProducto=(req,res)=>{

    //aqui va la logica de editar producto

    res.json({
        msg:"producto editado",
    });
};

const eliminarProducto=(req,res)=>{

    //aqui va la logica de eliminar producto

    res.json({
        msg:"producto eliminado",
    });
};

const cargarProducto=(req,res)=>{

    //aqui va la logica de carga de productos

    res.json({
        msg:"cargados",
    });
};

module.exports= {crearProducto,editarProducto,eliminarProducto,cargarProducto};