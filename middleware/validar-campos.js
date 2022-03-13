const { validationResult } = require('express-validator');

const validarCampos = (req,res, next) => {
    const errors = validationResult(req);
    if( !errors.isEmpty() ){
         return res.status(400).json(errors)
    }
    next() // si llega a este punto continua con el siguiente middleware, en este caso sigue con el controlador
}

module.exports = {
    validarCampos
}