const { response } = require("express");
const { ObjectId } = require('mongoose').Types;
const {Usuario, Categoria, Producto} = require('../models');
const { find } = require("../models/usuario");

const colecionesPermitidas = [
    'usuarios',
    'productos',
    'categorias',
    'roles'
]

const buscarUsuario = async ( termino = '', res=response) => {
    const esMongoId = ObjectId.isValid( termino); // true
    if( esMongoId ){
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        })
    }
    const regex = new RegExp( termino, 'i');
    const usuarios = await Usuario.find({
        $or: [{nombre: regex}, {correo: regex}],
        $and: [{estado: true}]
    });
    res.json({
        results: usuarios
    })
}

const buscarCategoria = async ( termino = '', res = response) => {
    const esMongoId = ObjectId.isValid( termino );
    if( esMongoId ) {
        const categoria = await Categoria.findById( termino );
        return res.json({
            results: (categoria) ? [categoria] : []
        })
    }
    const regex = new RegExp( termino , 'i' );
    const categorias = await Categoria.find({
        nombre: regex,  estado: true
        });
    res.json({
        results: categorias
    })
}

const buscarProducto = async ( termino = '', res = response) => {
    const esMongoId = ObjectId.isValid(termino);
    if( esMongoId ) {
        const producto = await Producto.findById( termino ).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto]: []
        })
    }
    const regex = new RegExp( termino, 'i');
    const productos = await Producto.find({
        nombre: regex,estado: true
        }).populate('categoria', 'nombre');
    res.json({
        results: productos
    })
}



const buscar = (req, res=response) => {

    const {coleccion, termino} = req.params;

    if( !colecionesPermitidas.includes(coleccion)){
        return res.status(400).json({
            msg:`La colleccion ${coleccion} no esta permitida`
        })
    }

    switch(coleccion){
        case 'usuarios':
            buscarUsuario(termino, res);
        break;
        case 'categorias':
            buscarCategoria(termino, res);
        break;
        case 'productos':
            buscarProducto(termino, res);
        break;
        default:
            res.status(500).json({
                msg:'Se le olvido hacer esta búsqueda'
            })
    }
}
module.exports = {
    buscar
}
