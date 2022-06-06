const { Router } = require('express'); // me permite llamar esa función
const { check } = require('express-validator');
const { cargarArchivos, actualizarImagen, mostrarImagen, actualizarImagenCloudinary } = require('../controllers/uploads');
const { coleccionesPermitidas } = require('../helpers');
const { validaArchivoSubir } = require('../middleware');
const { validarCampos} = require('../middleware/validar-campos');

const router = Router();

router.post('/', cargarArchivos);
router.put('/:coleccion/:id', [
    validaArchivoSubir,
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
],actualizarImagenCloudinary);
// ] ,actualizarImagen);

router.get('/:coleccion/:id',[
    check('id','El id debe ser un id de mongo').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas(c, ['usuarios','productos'])),
    validarCampos
], mostrarImagen)


module.exports = router;
