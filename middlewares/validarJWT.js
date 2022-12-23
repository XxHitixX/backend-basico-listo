const { request, response } = require("express");
const jwt = require('jsonwebtoken');
const Usuario = require('../models/user');



const validarJWT = async( req = request, res = response, next) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No ha venido ningún token'
        })
    }

    try {

        const { uid }  = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.usuario = uid;
        next();

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            msg: 'Token no válido'
        })
    }


  
}


module.exports = {
    validarJWT
}