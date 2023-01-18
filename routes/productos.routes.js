
const Router = require('express');
const { check } = require('express-validator');

const { crearProducto, 
    obtenerProductos, 
    obtenerProducto, 
    actualizarProducto, 
    eliminarProducto } = require('../controllers/productos.controller');
const { validarJWT, validarCampos } = require('../middlewares');
const { existeProductoPorID } = require('../helpers/validadores');


const router = Router();


//crearProducto
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la producto es obligatorio').not().isEmpty(),
    check('categoria', 'La categoria es obligatoria').not().isEmpty(),
    check('categoria', 'Debe ser un id de Mongo valido').isMongoId(),
    validarCampos 
],crearProducto)

//obtenerProductos
router.get('/', [
    validarJWT,
    validarCampos
],obtenerProductos)


//obtenerProducto
router.get('/:id', [
    validarJWT,
    check('id', 'Debe ser un id válido de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos],obtenerProducto)

//actualizarProducto
router.put('/:id', [
    validarJWT,
    check('id', 'Debe ser un id válido de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    check('categoria', 'Debe ser un id válido de Mongo').isMongoId(),
    validarCampos
], actualizarProducto)


//eliminarProducto
router.delete('/:id', [
    validarJWT,
    check('id', 'Debe ser un id válido de Mongo').isMongoId(),
    check('id').custom(existeProductoPorID),
    validarCampos
], eliminarProducto)


module.exports = router