
const Router = require('express');
const { check } = require('express-validator');
const { login, validaJWT } = require('../controllers/auth.controller');
const { validarCampos } = require('../middlewares/verificar-campos');


const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').not().isEmpty(),
    validarCampos],
    login);

router.get('/validarToken', validaJWT)

module.exports = router;