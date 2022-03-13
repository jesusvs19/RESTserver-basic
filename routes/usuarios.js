const { Router } = require('express'); // me permite llamar esa función

const { check } = require('express-validator');
const { validarCampos} = require('../middleware/validar-campos');
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');
const { rolExiste, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');


const router = Router();

router.get('/', usuariosGet ) //no se le agrega parentesis para que la función no sea ejecutada al momento de ser leido, se ejecutara cuando el usuario haga la petición

router.post('/',[
    check('nombre','El nombre es obligatorio').notEmpty(),
    check('correo','Este correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password','Se requiere minimo 6 carácteres').isLength({ min:6}),
    check('rol').custom( rolExiste),
    validarCampos
    
], usuariosPost )

router.put('/:id', [
    check('id','No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosPut )

router.delete('/:id', [
    check('id','No es un ID valido').isMongoId(),
    validarCampos
] , usuariosDelete )

router.patch('/', usuariosPatch )

module.exports = router;