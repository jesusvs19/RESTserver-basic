const { Router } = require('express'); // me permite llamar esa función
const { check } = require('express-validator');
const { obtenerProductos, obtenerProducto, crearProducto, actualizarProducto, borrarProducto } = require('../controllers/productos');
const {  existeProducto, existeCategoria } = require('../helpers/db-validators');

const { 
    validarJWT, 
    validarCampos,
    esAdminRol
} = require('../middleware');

const router = Router();

router.get('/', obtenerProductos );

router.get('/:id',[
check('id','No es un id valido').isMongoId(),
check('id').custom( existeProducto ),
     validarCampos
],obtenerProducto );

router.post('/',[
    validarJWT,
    check('nombre','El nombre es obligatorio').notEmpty(),
    // check('precio','Valor no valido').isNumeric(),
    check('categoria','No es un id valido').isMongoId(),
    check('categoria').custom( existeCategoria),
    // check('descripcion','La descripcion es obligatoria').notEmpty(),
    validarCampos
], crearProducto );

router.put('/:id', [
    validarJWT,
    check('id','El id no es valido').isMongoId(),
    check('id').custom( existeProducto ),
    check('categoria').if((value, {req}) => req.body.categoria)
        .custom( existeCategoria ),
    validarCampos
],actualizarProducto );

router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id','El id no es valido').isMongoId(),
    check('id').custom( existeProducto ),
    validarCampos
],borrarProducto );



module.exports = router