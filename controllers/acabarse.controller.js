const { response } = require("express");
const { Producto } = require('../models')



const quedanCinco = async(req, res = response) => {

    const productos = await Producto.find({
        estado: true, 
        stock: { $gte: 0, $lte: 10 }    
    })

    res.json({
        ok: true,
        productos
    })
}



module.exports = {
    quedanCinco
}