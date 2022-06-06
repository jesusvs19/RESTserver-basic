const { Categoria,Role,Usuario,Producto} = require("../models");

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

const existeCategoria = async (id) => {
    

    const categoria = await Categoria.findById(id);

    if( !categoria ){
        throw new Error('Este id no está registrado con alguna categoría');
    }
}
const existeProducto = async (id) => {
    

    const producto = await Producto.findById(id);

    if( !producto ){
        throw new Error('Este id no está registrado con algun producto');
    }
}
const categoriaExiste = async (categoria) => {

    const categoriaExist = await Categoria.findOne({categoria:categoria.toUpperCase()});
    if(categoriaExist){
        throw new Error('Este categoria ya existe');
    }

}

const coleccionesPermitidas = (c, colecciones=[]) => {
    const include = colecciones.includes(c);

    if( !include ){
        throw new Error(`La coleccion ${c} no es una coleccion permitida`);
    }
    return true;
}
module.exports = {
    rolExiste,
    emailExiste,
    existeUsuarioPorId,
    existeCategoria,
    existeProducto,
    categoriaExiste,
    coleccionesPermitidas
}