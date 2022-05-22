const { Router } = require('express'); // me permite llamar esa función
const { check } = require('express-validator');

const { 
    validarJWT, 
    validarCampos,
    esAdminRol
} = require('../middleware');
const {crearCategoria, obtenerCategoriaId, ObtenerCategorias, actualizarCategoria, borrarCategoria} = require('../controllers/categorias');
const { existeCategoria } = require('../helpers/db-validators');
const router = Router();


// Obtener todas las categorias - publico
router.get('/', ObtenerCategorias)

// Obtener categia por id - publico
router.get('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),
    validarCampos
],obtenerCategoriaId)

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es requediro').notEmpty(),
    validarCampos
],crearCategoria)

// Actualizar categoria - privado - cualquier persona con un token valido
router.put('/:id', [
    validarJWT,
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeCategoria ),

    validarCampos
],actualizarCategoria)

// Borrar categia - ADMIN
router.delete('/:id',[
    validarJWT,
    esAdminRol,
    check('id','No es un Id valido').isMongoId(),
    check('id').custom(existeCategoria),
    validarCampos
] ,borrarCategoria)





module.exports = router;