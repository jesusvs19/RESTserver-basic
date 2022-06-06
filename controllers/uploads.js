const path = require('path');
const fs = require('fs');

const { request } = require("express");
const { response } = require("express");


const { subirArchivo } = require("../helpers/");
const { Usuario, Producto } = require("../models");
const res = require('express/lib/response');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL) // para que sepa que usuario lo esta utilizando

const cargarArchivos = async (req, res = response) => {

    try {
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({ nombre });
    } catch (msg) {
        res.status(400).json({ msg });
    }


}

const actualizarImagen = async (req = request, res = response) => {

    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `El id ${id} no se encontro en ${coleccion}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `El id ${id} no se encontro en ${coleccion}`
                })
            }
            break;

        default:
            res.status(500).json({ msg: 'Se me olvido activibar' })
            break;
    }
    // Limpiar imagenes previas
    if( modelo.img ){
        // borrar imagen
        const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        if( fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }

    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre;
    modelo.save();

    res.json(modelo);
}

const actualizarImagenCloudinary = async (req = request, res = response) => {

    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `El id ${id} no se encontro en ${coleccion}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `El id ${id} no se encontro en ${coleccion}`
                })
            }
            break;

        default:
            res.status(500).json({ msg: 'Se me olvido activibar' })
            break;
    }
    // Limpiar imagenes previas
    if( modelo.img ){
        const pathArr = modelo.img.split('/');
        const nombre = pathArr[ pathArr.length -1 ];
        const [public_id] = nombre.split('.');
        cloudinary.uploader.destroy(public_id);

    }
    const { tempFilePath} =req.files.archivo;
    const {secure_url} = await cloudinary.uploader.upload(tempFilePath);
// const resp = req.files;
    // const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = secure_url;
    modelo.save();

    res.json(modelo);
}
const mostrarImagen = async (req, res) => {
    const { coleccion, id } = req.params;
    let modelo;
    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `El id ${id} no se encontro en ${coleccion}`
                })
            }
            break;
        case 'productos':
            modelo = await Producto.findById(id);
            if (!modelo) {
                return res.status(404).json({
                    msg: `El id ${id} no se encontro en ${coleccion}`
                })
            }
            break;

        default:
            res.status(500).json({ msg: 'Se me olvido activibar' })
            break;
    }
    // Limpiar imagenes previas
    if( modelo.img ){
        // borrar imagen
        // const pathImagen = path.join( __dirname, '../uploads', coleccion, modelo.img);
        // if( fs.existsSync(pathImagen)){
        //     return res.sendFile(pathImagen);
        // }
        return res.json({
            img: modelo.img
        });

    }
    const pathNotFound = path.join( __dirname, '../assets', 'no-image.jpg');
    res.sendFile(pathNotFound);
    
}

module.exports = {
    cargarArchivos,
    actualizarImagen,
    actualizarImagenCloudinary,
    mostrarImagen
}