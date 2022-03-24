const validarJWT = require('../middleware/validar-jwt');
const validarCampos= require('../middleware/validar-campos');
const validarRole= require('../middleware/validar-rol');

module.exports = {
    ...validarJWT,
    ...validarCampos,
    ...validarRole
}