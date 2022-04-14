const bcrypt = require('bcryptjs');
const { response, request} = require('express');
const { body } = require('express-validator');
const { generarJWT } = require('../helpers/generar-jwt');
const { googleVerify } = require('../helpers/google-verify');
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

const googleSingIn = async (req=request, res=response) => {
    const {id_token} = req.body;
    

    try {

        const {nombre, correo, img} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({correo});

        if( !usuario ){
            const data ={
                nombre,
                correo,
                password:':P',
                img,
                
                google:true
            }
            usuario = new Usuario(data);
            await usuario.save();

        }
        
        if( !usuario.estado ){
            return res.status(401).json({
                msg:'Usuario bloqueado, hable con el administrador'
            })
        }

        const token = await generarJWT( usuario.id);


        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({
            ok: false,
            msg:'El token no se pudo verificar'
        })
    }
    
}

module.exports = {
    login,
    googleSingIn
}