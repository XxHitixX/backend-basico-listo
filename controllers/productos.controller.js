const { request, response } = require("express");
const { Producto } = require('../models');


const crearProducto = async(req = request, res = response) => {

    const { estado, usuario, ...body } = req.body;
    
    body.nombre = body.nombre.toUpperCase();
    
    const productoDB = await Producto.findOne({ nombre: body.nombre })

    
    if( productoDB ) {
        return res.status(400).json({
            ok: false,
            msg: `El nombre ${ body.nombre}, ya está registrado en la base de datos.` 
        })
    }

/*     if( productoDB.proveedor === body.proveedor ){
        return res.status(400).json({
            ok: false,
            msg: `El nombre ${ body.nombre}, ya está registrado en la base de datos con el mismo proveedor.` 
        })
    } */

    const data = {
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
        proveedor: body.proveedor,
        stock: body.stock,
        costo: body.costo,
        estado: true,
        usuario: req.usuario,
        categoria: body.categoria
    }

    const producto = new Producto(data);

    await producto.save();

    res.json({
        ok: true,
        msg: 'creado',
        producto
    })
}

const obtenerProductos = async(req = request, res = response) => {
    
    const { desde = 0, limite = 0 }  = req.query;

    const [ totalProductos, productos ] = await Promise.all([
        Producto.countDocuments({ estado: true }),
        Producto.find({ estado: true })
                .skip(Number(desde))
                .limit(Number(limite))
                .populate('categoria', 'nombre')
                .populate('usuario', 'nombre')
    ])
    
    
    res.json({
        ok: true,
        totalProductos,
        productos
    })
}

const obtenerProducto = async(req = request, res = response) => {

    const { id } = req.params;
    
    const producto = await Producto.findById(id)
                                .populate('usuario', 'nombre')
                                .populate('categoria', 'nombre');

    
    res.json({
        ok: true,
        producto
    })
}

const actualizarProducto = async(req = request, res = response) => {
   
    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    const data = {
/*         nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
        estado: true,
        usuario: req.usuario,
        categoria: body.categoria */
        nombre: body.nombre,
        precio: body.precio,
        descripcion: body.descripcion,
        proveedor: body.proveedor,
        stock: body.stock,
        costo: body.costo,
        estado: true,
        usuario: req.usuario,
        categoria: body.categoria
    }

    const producto = await Producto.findByIdAndUpdate(id, data, { new: true });
   
    res.json({
        ok: true,
        producto
    })
}

const eliminarProducto = async(req = request, res = response) => {
    
    const { id } = req.params;

    await Producto.findByIdAndUpdate( id , {estado:false} );

    res.json({
        ok: true,
        msg: 'Producto eliminado'
    })
}

module.exports = {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    eliminarProducto

}
