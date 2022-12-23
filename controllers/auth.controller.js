const { response, request } = require("express");
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
                msg: 'El usuario y/o la contraseña es incorrecta - correo'
            });
        }

        //Si el usuario está activo 
        if( usuario.estado === false){
            return res.json({
                msg: 'El usuario y/o la contraseña es incorrecta - estado: false'
            });
        }

        //verificar que el password haga match con el de la bd
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if( !validPassword ){
            return res.json({
                msg: 'El usuario y/o la contraseña es incorrecta - password'
            })
        }

        const token = await generarJWT( usuario.id )

        res.status(200).json({
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


module.exports = {
    login
}