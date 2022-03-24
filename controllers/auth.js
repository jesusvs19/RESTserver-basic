const bcrypt = require('bcryptjs');
const { response, request} = require('express');
const { generarJWT } = require('../helpers/generar-jwt');
const Usuario = require('../models/usuario');


const login = async (req, res = response) => {
    
    const {correo, password} = req.body;

    // validar si correo existe

    const usuario = await Usuario.findOne({correo});
    try {
        if( !usuario){
            return res.json({
                msg: 'Usuario / password no es correcto - email'
            })
        }
    
    
        // verificar que el estado del usuario este activo
        if( !usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / password / estodo no es correcto - estado: false'
            })
        }
    
        // verificar contraseña
    
        const validPassword = bcrypt.compareSync(password, usuario.password);
        if( !validPassword){
            return res.status(400).json({
                msg: 'Usuario / password no es correcto - password'
            })
        }

        // generar JWT

        const token = await generarJWT( usuario.id);

        res.json({
            usuario,
            token
        })


    } catch (error) {
        return res.status(500).json({
            msg: 'error en el login'
        })
    }
    
}

module.exports = {
    login
}