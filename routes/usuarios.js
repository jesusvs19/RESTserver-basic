const { Router } = require('express'); // me permite llamar esa función
const router = Router();
const {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
} = require('../controllers/usuarios');

router.get('/', usuariosGet ) //no se le agrega parentesis para que la función no sea ejecutada al momento de ser leido, se ejecutara cuando el usuario haga la petición

router.post('/', usuariosPost )

router.put('/:id', usuariosPut )

router.delete('/', usuariosDelete )

router.patch('/', usuariosPatch )

module.exports = router;