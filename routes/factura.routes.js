const { Router } = require('express');
const { check } = require('express-validator');
const { obtenerFacturas, obtenerFactura, crearFactura, actualizarFactura, eliminarFactura } = require('../controllers/facturas.controller');
const { validarJWT, validarCampos, esAdminRol } = require('../middlewares');
const { existeFacturaPorID } = require('../helpers/validadores');



const router = Router();


//Obtener facturas
router.get('/', [
    validarCampos
],obtenerFacturas)

//Obtener factura
router.get('/:id', [
    validarJWT,
    check('id', 'El id debe ser un MongoId válido').isMongoId(),
    check('id').custom(existeFacturaPorID),
    validarCampos,
] ,obtenerFactura)

//Crear factura
router.post('/', [
    validarJWT,
    check('cliente', 'Es obligatorio el cliente').isMongoId(),
    check('cliente', 'Es obligatorio el cliente').not().isEmpty(),
    check('tipoPago', 'Es necesario establecer el tipo de pago').isIn(['efectivo', 'tarjeta', 'transferencia']),
    check('total', 'Debe venir el total de la factura').not().isEmpty(),
    validarCampos
],crearFactura);

//Editar facturas
router.put('/:id', [
    validarJWT,
    check('cliente', 'Es obligatorio el cliente').isMongoId(),
    check('cliente', 'Es obligatorio el cliente').not().isEmpty(),
    check('tipoPago', 'Es necesario establecer el tipo de pago').isIn(['efectivo', 'tarjeta', 'transferencia']),
    check('total', 'Debe venir el total de la factura').not().isEmpty(),
    validarCampos
],actualizarFactura)

//Eliminar facturas
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'El id debe ser un MongoId válido').isMongoId(),
    check('id').custom(existeFacturaPorID),
    validarCampos,
] ,eliminarFactura)


module.exports = router;