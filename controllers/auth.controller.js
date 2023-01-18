const { response, request } = require("express");
const jwt  = require('jsonwebtoken');

const Usuario = require('../models/user');
const bcryptjs = require('bcryptjs');

const { generarJWT } = require("../helpers/generar-jwt");


const login = async(req = request, res = response) => {

    try {

        const { correo, password } = req.body;
        const usuario = await Usuario.findOne({ correo });

        //verificar que el correo exista
        if ( !usuario ) {
            return res.status(400).json({
                ok: false,
                msg: 'El usuario y/o la contraseña es incorrecta - correo'
            });
        }

        //Si el usuario está activo 
        if( usuario.estado === false){
            return res.json({
                ok: false,
                msg: 'El usuario y/o la contraseña es incorrecta - estado: false'
            });
        }

        //verificar que el password haga match con el de la bd
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword ){
            return res.json({
                ok: false,
                msg: 'El usuario y/o la contraseña es incorrecta - password'
            })
        }

        const token = await generarJWT( usuario.id )

        res.status(200).json({
            ok: true,
            usuario,
            token
        })



        //Generar el JWT

    } catch (error) {
        console.log('Error en al realizar el login: ', error);
        res.status(500).json({
            msg: 'Algo salió mal, contacta con el administrador'
        })
    }


}


const validaJWT = async( req, res) => {

    const token = req.header('x-token');

    if( !token ){
        return res.status(401).json({
            msg: 'No ha venido ningún token'
        })
    }

    try {

        const { uid }  = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

        req.usuario = uid;

        res.json({
            ok: true,
            uid,
            token
        })

    } catch (error) {

        console.log(error);
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        })
    }


  
}


module.exports = {
    login,
    validaJWT
}
