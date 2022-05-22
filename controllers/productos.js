const { request,response } = require("express");
const { Categoria } = require("../models");

const Producto = require('../models/producto');

const obtenerProductos = async (req, res=response) => {
    const query = {estado:true};

    const [total,productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
        .populate('usuario','nombre')
        .populate('categoria','nombre')
    ]);

    return res.status(200).json({
        total,
        productos
    });
}

const obtenerProducto = async (req, res=response) => {

    const {id} = req.params;
    
    const producto = await Producto.findById(id)
        .populate('usuario','nombre')
        .populate('categoria','nombre');


    return res.status(200).json({
        producto
    })
}

const crearProducto = async (req, res=response) => {

    const {estado, usuario, ...body} = req.body;

    const productoDB = await Producto.findOne({nombre: body.nombre});

    if( productoDB ){
        return res.json({
            msg:`El producto ${productoDB} ya exite`
        })
    }
    

    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        
        usuario:req.usuario._id
    }

    const producto = new Producto(data);
    await producto.save();

    res.json({
        producto
    })
}
const actualizarProducto = async (req, res=response) => {
    const {id} = req.params;
    const {estado, usuario,...data} = req.body;
    

    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;


    const producto = await Producto.findByIdAndUpdate(id,data,{new:true});
    
    res.json({
        producto
    })
}
const borrarProducto = async (req, res=response) => {
    const {id} = req.params;

    const producto = await Producto.findByIdAndUpdate(id,{estado:false});
    res.json({
        msg:'Producto borrado'
    })
}

module.exports = {
    obtenerProductos,
    obtenerProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto
}