const Router = require('express');
const { check } = require('express-validator');
const { getUsuario, putUsuario, postUsuario, deleteUsuario, patchUsuario } = require('../controllers/users.controller');
const { validarRol, emailExiste, existeUsuarioPorID } = require('../helpers/validadores');

/* const { validarCampos } = require('../middlewares/verificar-campos');
const { validarJWT } = require('../middlewares/validarJWT');
const { esAdminRol, tieneRol } = require('../middlewares/validar-rol');
 */

const {
    validarCampos,
    validarJWT,
    esAdminRol,
    tieneRol
} = require('../middlewares')


const router = Router();

router.get('/', getUsuario);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    check('rol').custom( validarRol ),
    validarCampos
] ,putUsuario);

router.post('/', [
    check('nombre', 'El nombre no puede estár vacío').not().isEmpty(),
    check('correo', 'Correo no valido').isEmail(),
    check('correo').custom( emailExiste ),
    check('password', 'La constraseña debe ser mínimo de 6 letras').isLength({ min: 6}),
    /* check('role', 'El rol debe ser válido').isIn(['ADMIN_ROLE', 'USER_ROLE']), */
    check('rol').custom( validarRol ),
    validarCampos
], postUsuario);

router.delete('/:id',[
    validarJWT,
    //esAdminRol,
    tieneRol('ADMIN_ROLE', 'VENTAS_ROLE', 'USUARIOS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom( existeUsuarioPorID ),
    validarCampos],
    deleteUsuario);

router.patch('/', patchUsuario);


module.exports = router;