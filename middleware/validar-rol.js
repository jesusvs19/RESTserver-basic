const {request, response} = require('express');

const esAdminRol = (req, res, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere verificar el role sin validar el token primero'
        })
    }
    const {rol} = req.usuario;
    
    if( rol != 'ADMIN_ROLE'){
        return res.status(401).json({
            msg:'Rol no valido para eliminar usuarios'
        })
    }
    
    next();
}

const tieneRole = (...roles) => {
    return (req, res, next) => {
        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere verificar el role sin validar el token primero'
            })
        }

        if( !roles.includes(req.usuario.rol) ){
            return res.status(401).json({
                msg:`Se requiere ${roles} para hacer esta acción`
            })
        }
        next();
    }
}

module.exports = {
    esAdminRol,
    tieneRole
}