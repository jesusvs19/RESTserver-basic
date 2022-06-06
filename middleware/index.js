const validarJWT = require('../middleware/validar-jwt');
const validarCampos= require('../middleware/validar-campos');
const validarRole= require('../middleware/validar-rol');
const validarArchivo = require('../middleware/validar-archivo');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validarRole,
    ...validarArchivo
}