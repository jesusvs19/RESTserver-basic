const bcryptjs = require('bcryptjs');
const {request,response} = require('express')


const Usuario = require('../models/usuario');


const usuariosGet = async (req = request,res = response) => {
    const {limite=5,desde=5} = req.query
    const query = {estado:true};

    const [users, total] = await Promise.all([
        Usuario.find(query)
        .skip(Number(desde))
        .limit(Number(limite)),
        Usuario.countDocuments(query)
    ])
    
    res.json({
        total,
        users
        
    })
}
const  usuariosPost = async (req = request,res = response) => {


    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    // Verificar si el correo exite
   

    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync(password,salt);
    
    // Guardar en DB
    await usuario.save();

    res.json({
        msg: 'Registro completado'
    })

}
const usuariosPut = async (req,res = response) => {
    const {id} = req.params;
    

    const {_id, email, google, ...resto} = req.body;

    if(password){
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password,salt);
    }
    
    const usuario = await Usuario.findByIdAndUpdate(id, resto);
   
    res.json(
        usuario
   );
}

const usuariosDelete = async (req,res = response) => {
    const {id} = req.params;
    const usuarioAutenticado = req.usuario;
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    res.json({
        usuario,
        usuarioAutenticado
    });
}

const usuariosPatch = (req,res = response) => {
    res.json({
        msg:'patch api - controller'
    });
}


module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}