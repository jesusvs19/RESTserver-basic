
const { request,response } = require("express");

const {Categoria} = require("../models");


const ObtenerCategorias = async (req=request, res= response) => {
    const query = {estado:true};

    const [categorias, total] = await Promise.all([
        Categoria.find(query).populate('usuario','nombre'),
        Categoria.countDocuments(query)
    ])

    return res.status(200).json({
        total,
        categorias
    });
}


const obtenerCategoriaId = async (req=request, res= response)=>{
    const {id} = req.params;

    const categoria = await Categoria.findById(id).populate('usuario','nombre');

    return res.status(200).json({
        categoria,

    });
}



const crearCategoria = async (req=request, res=response) => {

    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if( categoriaDB ){
        return res.status(400).json({
            msg:`La categoría ${categoriaDB} ya existe`
        })
    }

    const data = {
        nombre,
        usuario:req.usuario
    }

    const categoria = new Categoria(data);

    await categoria.save();

    res.json(categoria)
}

const actualizarCategoria = async (req=request, res=response) => {

    const {id} = req.params;
    const {estado, usuario,...data} = req.body;
    data.nombre= data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    const categoria = await Categoria.findByIdAndUpdate(id,data,{new:true}); // {new:true} muestra los cambios en la respuesta json

    res.status(200).json({

        categoria
        
    })
}



const borrarCategoria = async (req=request, res=response) => {

    const {id} = req.params;
    const query = {estado:false};

    const categoria = await Categoria.findByIdAndUpdate(id,query);

    res.status(200).json({
        msg:'categoria eliminada'
    })
}

module.exports = {
    ObtenerCategorias,
    obtenerCategoriaId,
    crearCategoria,
    actualizarCategoria,
    borrarCategoria
}