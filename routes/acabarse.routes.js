const { Router } = require('express');
const { validarJWT } = require('../middlewares')
const { quedanCinco } = require('../controllers/acabarse.controller');


const router = Router();

router.get('/',[
    validarJWT
],quedanCinco);





module.exports = router;