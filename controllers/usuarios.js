const {request,response} = require('express');

const usuariosGet = (req = request,res = response) => {
    const {page, apikey,name='no name'} = req.query
    res.json({
        msg:'get api - controller',
        page,
        apikey,
        name
    });
}
const usuariosPost = (req,res = response) => {
    const {nombre, edad} = req.body;
    res.json({
        msg:'post api - controller',
        nombre,
        edad
    });
}
const usuariosPut = (req,res = response) => {
    const id = req.params.id
    res.json({
        msg:'put api - controller',
        id
    });
}
const usuariosPatch = (req,res = response) => {
    res.json({
        msg:'patch api - controller'
    });
}
const usuariosDelete = (req,res = response) => {
    res.json({
        msg:'delete api - controller'
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}