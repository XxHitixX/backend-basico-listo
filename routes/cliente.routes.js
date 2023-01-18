
const Router = require('express');
const { check } = require('express-validator');

const { crearCliente, 
    obtenerClientes, 
    obtenerCliente, 
    actualizarCliente, 
    eliminarCliente } = require('../controllers/cliente.controller');
const { validarJWT, validarCampos } = require('../middlewares');
const { existeClientePorID } = require('../helpers/validadores');


const router = Router();


//crearCliente
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la Cliente es obligatorio').not().isEmpty(),
    check('cedula', 'La cedula es obligatoria').not().isEmpty(),
    check('cedula', 'La cedula debe tener minimo 5 caracteres').isLength({ min: 5}),
    check('correo', 'El correo debe tener pinta de correo').isEmail(),
    validarCampos 
],crearCliente)

//obtenerClientes
router.get('/', [
    validarJWT,
    validarCampos
],obtenerClientes)


//obtenerCliente
router.get('/:id', [
    validarJWT,
    check('id', 'Debe ser un id válido de Mongo').isMongoId(),
    check('id').custom(existeClientePorID),
    validarCampos],obtenerCliente)

//actualizarCliente
router.put('/:id', [
    validarJWT,
    check('id', 'Debe ser un id válido de Mongo').isMongoId(),
    check('id').custom(existeClientePorID),
    validarCampos
], actualizarCliente)


//eliminarCliente
router.delete('/:id', [
    validarJWT,
    check('id', 'Debe ser un id válido de Mongo').isMongoId(),
    check('id').custom(existeClientePorID),
    validarCampos
], eliminarCliente)


module.exports = router