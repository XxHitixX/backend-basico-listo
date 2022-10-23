const { response, request } = require('express');


const getUsuario = (req, res) => {

    const { id='Not provided', nombre = 'Not name', limit = 10, page = 1  } = req.query;

    res.json({
        ok: true,
        msg: 'Get API - controller',
        id,
        nombre,
        limit,
        page

    });
}

const postUsuario = (req, res = response) => {

    const body = req.body;
    const { edad, nombre } = body;

    res.json({
        ok: true,
        msg: 'POST API - controller',
        body,
        edad,
        nombre
    });
}

const putUsuario = (req = request, res) => {

    const { id } = req.params;

    res.json({
        ok: true,
        msg: 'PUT API - controller',
        id
    });
}

const deleteUsuario =  (req, res) => {
    res.json({
        ok: true,
        msg: 'DELETE API - controller'
    });
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