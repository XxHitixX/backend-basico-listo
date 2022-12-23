

const validarCampos = require('../middlewares/verificar-campos');
const validar_JWT = require('../middlewares/validarJWT');
const validarRol = require('../middlewares/validar-rol');

module.exports = {
    ...validarCampos,
    ...validar_JWT,
    ...validarRol,
}