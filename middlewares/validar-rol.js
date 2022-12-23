const Usuario = require('../models/user');
const { response, request } = require("express");


const esAdminRol = async(req = request, res = response, next) => {

    if( !req.usuario ){
        return res.status(500).json({
            msg: 'Se quiere validar el rol sin validar el token primero'
        });
    }

    const usuario = await Usuario.findOne({ _id: req.usuario })
     const { rol, nombre } = usuario;

    if(rol !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `El usuario ${nombre} no es un administrador, no tiene permitido hacer eso`
        });
    }

    next();


}


const tieneRol = ( ...roles ) =>{
    return async (req, res = response, next) => {
        
        if( !req.usuario ){
            return res.status(500).json({
                msg: 'Se quiere validar el rol sin validar el token primero'
            });
        }
        const usuario = await Usuario.findById(req.usuario);
        console.log(usuario);
        if( !roles.includes( usuario.rol ) ){
            return res.status(401).json({
                msg: `El servicio requiere los siguientes roles: ${roles}`
            })
        }

        next();

    }
}

module.exports = {
    esAdminRol,
    tieneRol
}