const { response, request } = require('express');
const Usuario = require('../models/user');
const bcrypt = require('bcryptjs');



const getUsuario = async (req = request, res = response) => {

    //const { id='Not provided', nombre = 'Not name', limit = 10, page = 1  } = req.query;
    const { limite, desde } = req.query;

   /*  const usuario = await Usuario.find({ estado: true })
        .limit(Number(limite))
        .skip(Number(desde))

    const totalRegistros = await Usuario.countDocuments({ estado: true }); */

    //Los await son funciones bloqueantes lo que va a esperar primero a que se resuelva
    //Primero el de usuario y luego el de totalRegistros
    //SOlucion es utilizar un arreglo de promesas de la con Promise.all()
    // como la respuesta es un arreglo, puedo hacer desestructuracion de arreglos para mostrar
    //en la respuesta el nombre de total y usuarios
    /* const resp = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .limit(Number(limite))
            .skip(Number(desde))
    ])
 */
    const [total, usuario] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .limit(Number(limite))
            .skip(Number(desde))
    ])


    res.json({
        total, 
        usuario
        /* totalRegistros,
        usuario, */
    });
    /* res.json({
        ok: true,
        msg: 'Get API - controller',
        id,
        nombre,
        limit,
        page

    });
 */
}

const postUsuario = async (req, res = response) => {


    //const { google, ...resto } = req.body;
    const { nombre, correo, password, role } = req.body
    //const { edad, nombre } = body;
    const usuario = new Usuario({ nombre, correo, password, role });

    const salt = bcrypt.genSaltSync(10);
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.json({
        ok: true,
        usuario,
        //edad,
        //nombre
    });
}

const putUsuario = async (req = request, res) => {

    const { id } = req.params;
    const { password, google, correo, ...resto } = req.body;

    if (password) {
        const salt = bcrypt.genSaltSync(10);
        resto.password = bcrypt.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const deleteUsuario = async(req, res) => {
    
    const { id } = req.params;

    console.log(req.uid);
    
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false })

    res.json(usuario);
}

const patchUsuario = (req, res) => {
    res.json({
        ok: true,
        msg: 'PATCH APIv - controller'
    });
}

module.exports = {
    getUsuario,
    putUsuario,
    patchUsuario,
    postUsuario,
    deleteUsuario
}