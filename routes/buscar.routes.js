const {Router} = require('express');
const { buscarColeccion } = require('../controllers/buscar.controller');

const router = Router();

router.get('/:coleccion/:termino', buscarColeccion);


module.exports = router;