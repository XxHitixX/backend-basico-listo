const { response } = require("express");
const { ObjectId }  = require('mongoose').Types;

const { Usuario, Categoria, Producto, Cliente } = require('../models');


const coleccionesPermitidas = [
    'usuarios',
    'productos',
    'clientes',
    'categorias'
];

const buscarUsuario = async( termino, res = response ) => {

    const esMongoId = ObjectId.isValid(termino);
    
    if( esMongoId ){
        const usuario = await Usuario.findById(termino)
        res.json({
            results:  ( usuario ) ? [ usuario ] : [] 
        })
    }

    //Expresion regular que pone lo que escriba en la busqueda como insensible a mayus y minusculas
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({ 
        $or: [ {nombre: regex}, { correo: regex }],
        $and: [ { estado: true} ]
    });
    const cantidadUsuarios = await Usuario.countDocuments({ 
        $or: [ {nombre: regex}, { correo: regex }],
        $and: [ { estado: true} ]
    });
    res.json({
        total: cantidadUsuarios,
        results:  ( usuarios ) ? [ usuarios ] : [] 
    })
}

const buscarCategoria = async(termino, res = response) => {

    const esMongoId = ObjectId.isValid(termino);
    
    if( esMongoId ){
        const categoria = await Categoria.findById(termino)
        res.json({
            results:  ( categoria ) ? [ categoria ] : [] 
        })
    }

    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true })
    const totalCategorias = await Categoria.countDocuments({ nombre: regex, estado: true })

    res.json({
        total: totalCategorias,
        results: ( categorias ) ? [ categorias ] : []
    })
}

const buscarProducto = async(termino, res = response) => {

    const esMongoID = ObjectId.isValid();

    if( esMongoID ){
        const producto = await Producto.findById(termino);
        return res.json({
            results: ( producto ) ? [ producto ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({
        $or: [{nombre: regex}, { proveedor: regex }],
        $and: [{estado: true}]
    }).populate('usuario', 'nombre')
    .populate('categoria', 'nombre')
    
  /*   const totalProductos = await Producto.countDocuments({
        $or: [{nombre: regex}, { proveedor: regex }],
        $and: [{estado: true}]
    }) */

    res.json({
        results: ( productos ) ? [ productos ] : []
    })

    
}

const buscarCliente = async(termino, res = response) => {

    const esMongoID = ObjectId.isValid();

    if( esMongoID ){
        const cliente = await Cliente.findById(termino);
        return res.json({
            results: ( cliente ) ? [ cliente ] : []
        })
    }

    const regex = new RegExp(termino, 'i');

    const clientes = await Cliente.find({
        $or: [{nombre: regex}, { cedula: regex }],
        $and: [{estado: true}]
    })
    
   /*  const totalClientes = await Cliente.countDocuments({
        $or: [{nombre: regex}, { cedula: regex }],
        $and: [{estado: true}]
    }) */

    res.json({
        results: ( clientes ) ? [ clientes ] : []
    })

    
}

const buscarColeccion = (req, res = response) => {
    
    const { coleccion, termino } = req.params

    if( !coleccionesPermitidas.includes( coleccion ) ){
        return res.status(400).json({
            ok: false,
            msg: `El término ${ coleccion }, no está en la lista de colecciones`,
            colecciones: coleccionesPermitidas
        })
    }

    switch (coleccion) {
        
        case 'usuarios':
            buscarUsuario(termino, res);
            break;
        case 'productos':
            buscarProducto(termino, res);
            break;
        case 'clientes':
            buscarCliente(termino, res);
            break;
        case 'categorias':
            buscarCategoria(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Se le olvió hacer esta busqueda'
            });
    }
}


module.exports = {
    buscarColeccion
}