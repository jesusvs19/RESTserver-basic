const Role = require("../models/role")
const Usuario = require('../models/usuario');

const rolExiste = async (rol)=>{

    const existeRol = await Role.findOne({rol})
    if( !existeRol ){
        throw new Error('El rol no es valido');
    }
}
const emailExiste = async (correo) => {

    const emailExist = await Usuario.findOne({correo});
    if(emailExist){
        throw new Error('Este correo ya existe');
    }

}

const existeUsuarioPorId = async (id) => {
    

    const usuario = await Usuario.findById(id);

    if( !usuario ){
        throw new Error('Este id no está registrado');
    }
}
module.exports = {
    rolExiste,
    emailExiste,
    existeUsuarioPorId
}