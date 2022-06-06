const dbValidator = require('./db-validators');
const generarJWT = require('./generar-jwt');
const googleVerify = require('./generar-jwt');
const subirArchivo = require('./subir-archivo');

module.exports = {
    ...dbValidator,
    ...generarJWT,
    ...googleVerify,
    ...subirArchivo
}
