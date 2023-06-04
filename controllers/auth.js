
const bcryptjs= require('bcryptjs');
const jwt = require("jsonwebtoken");
const Usuario = require('../models/usuario-model');

const crearUsuario = async (req,res)=>{

  const {name, email,password}=req.body;

  try {
      
      let user=await Usuario.findOne({email})

      if(user){
          return res.status(400).json({
              ok:false,
              msg:"un usuario ya existe con ese correo"
          })
      }
      user= new Usuario(req.body);
      console.log(user);
      //encriptacion de contraseñas
      const salt=bcryptjs.genSaltSync(10);
      user.password= bcryptjs.hashSync(password,salt);


      
     await user.save();

     res.status(201).json({
      ok: true,
      uid:user._id,
      name:user.name,
      rol:user.rol,
      msg: 'el usuario se guardo correctamente',
      
  });

  } catch (error) {
      console.log(error);
      res.status(500).json({
          ok:false,
          msg:"por favor contactarse cono  el administrador"
      })

  }
}

const loginUsuario = async (req,res)=>{

    const {email, password}=req.body;

    try {
        
        let user=await Usuario.findOne({email})

        if(!user){
            return res.status(400).json({
                ok:false,
                msg:"no hay nadie registrado con este email"
            })
        }

        const validarpassword=bcryptjs.compareSync(password,user.password);

        if(!validarpassword){
            return res.status(400).json({
                ok: false,
                msg: 'contraseña incorrecta'
            });
        }

        //generar nuestro JWT
        const payload ={
            id: user._id,
            name: user.name,
        };
        
        const token=jwt.sign(payload,process.env.SECRET_JWT,{
            expiresIn:"20h",
        });

        res.status(200).json({
            ok: true,
            id:user._id,
            name: user.name,
            rol:user.rol,
            token,
            msg: 'el usario se logueo',
            
        });

    } catch (error) {
        console.log(error);
        res.status().json({
            ok:false,
            msg:"por favor contactarse cono  el administrador"
        })
    }
    
}

module.exports={
    crearUsuario,
    loginUsuario,
};