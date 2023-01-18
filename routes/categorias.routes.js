
const { response } = require('express');
const Router = require('express');
const { check } = require('express-validator');
const { crearCategoria, 
        todaslasCategorias, 
        buscarCategoriaID,
        editarCategoria,
        eliminarCategoria} = require('../controllers/categorias.controller');
const { existeCategoriaPorID } = require('../helpers/validadores');
const { validarCampos, validarJWT, esAdminRol } = require('../middlewares');


const router = Router();

/* Listar todas las categorias */
router.get('/', [ 
    validarJWT,
    validarCampos] ,todaslasCategorias)


/* Crear una nueva categoría - debe ser privado o sea verificar el JWT */
router.post('/', [
    validarJWT,
    check('nombre', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    validarCampos
],crearCategoria);


/* Buscar una categoría por ID */
router.get('/:id', [
    validarJWT,
    check('id', 'Debe ser un id de válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos,
],buscarCategoriaID);


/* Modificar categoría */
router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre de la categoría es obligatorio').not().isEmpty(),
    check('id', 'Debe ser un id de válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos,
], editarCategoria);

/* eliminar categoría */
router.delete('/:id', [
    validarJWT,
    esAdminRol,
    check('id', 'Debe ser un id de válido').isMongoId(),
    check('id').custom(existeCategoriaPorID),
    validarCampos,
], eliminarCategoria);


module.exports = router;