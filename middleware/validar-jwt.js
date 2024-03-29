const jwt = require('jsonwebtoken');
const {request, response} = require('express');

const Usuario = require('../models/usuario');

const validarJWT = async (req = request , res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: ' No hay token en la petición'
        })
    }

    try {
        
        const {uid} = jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        // leer el usuario que corresponde al uuid
        const usuario = await Usuario.findById(uid);

        if ( !usuario ){
            return res.status(401).json({
                msg:'token no valido - usuario no existe en DB'
            })
        }
        if ( !usuario.estado ){
            return res.status(401).json({
                msg:'token no valido - usuario con estado: false'
            })
        }
        


        req.usuario=usuario;
        next()
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        })
        
    }
}

module.exports = {
    validarJWT
}