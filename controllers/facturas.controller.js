const { response } = require("express");

const { Factura } = require('../models');


const crearFactura = async(req, res = response) => {
    
    const { estado, usuario, cliente, tipoPago, total, ...productos } = req.body;
    const { items } = productos;

    const data = {
        usuario: req.usuario,
        cliente,
        tipoPago,
        total,
        items
    }
    const factura = new Factura(data);
    await factura.save();

    res.json({
        ok: true,
        msg: 'Factura creada...'
    })

    
}

const obtenerFacturas = async(req, res = response) => {
    
    const { desde, limite } = req.query;

    const [ totalFactura, facturas ] = await Promise.all([
        Factura.countDocuments({estado: true}),
        Factura.find({estado : true})
               .populate('cliente', 'nombre')
               .populate('usuario', 'nombre')
               .populate('items.producto', 'nombre')
               .skip(desde)
               .limit(limite)
    ])
    
    res.json({
        ok: true,
        totalFactura,
        facturas
    })
}

const obtenerFactura = async(req, res = response) => {
    const { id } = req.params;

    const factura = await Factura.findById(id)
                                .populate('cliente', 'nombre')
                                .populate('usuario', 'nombre')
                                .populate('items.producto', 'nombre')

    res.json({
        ok: true,
        factura
    })
}

const actualizarFactura = async(req, res = response) => {
    const { id } = req.params;
    const { estado, usuario, cliente, tipoPago, total, ...productos } = req.body;
    const { items } = productos;

    const factura = await Factura.findByIdAndUpdate(id, {
        cliente,
        tipoPago,
        total,
        items
    }, { new: true });

    
    res.json({
        ok: true,
        msg: 'Factura actualizada',
        factura
    })
}

const eliminarFactura = async(req, res = response) => {
    
    const { id } = req.params;

    await Factura.findByIdAndUpdate(id, {estado:false} /* {new: true} */)
    res.json({
        ok: true,
        msg: 'Factura eliminada'
    })
}

module.exports = {
    crearFactura,
    obtenerFactura,
    obtenerFacturas,
    actualizarFactura,
    eliminarFactura
}