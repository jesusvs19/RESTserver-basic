const { Router } = require('express'); // me permite llamar esa función
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validarCampos} = require('../middleware/validar-campos');
const router = Router();

router.post('/login',[
    
    check('correo','Este correo no es valido').isEmail(),
    check('password','La contraseña es obligatoria').notEmpty(),
    validarCampos
], login)


module.exports = router;
