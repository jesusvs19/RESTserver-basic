const { Router } = require('express'); // me permite llamar esa función
const { check } = require('express-validator');

const { login, googleSingIn } = require('../controllers/auth');
const { validarCampos} = require('../middleware/validar-campos');
const router = Router();

router.post('/login',[
    
    check('correo','Este correo no es valido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
], login)
router.post('/google',[
    check('id_token','El token es obligatorio').notEmpty(),
    validarCampos
], googleSingIn)


module.exports = router;
