
const { request, response } = require('express');
const { Categoria } = require('../models')

const crearCategoria = async(req, res) => {
    
    const nombre = req.body.nombre.toUpperCase();

    const categoriaDB = await Categoria.findOne({nombre});

    if( categoriaDB ){
        return res.status(400).jason({
            msg: `La categoria ${categoriaDB.nombre}, ya se encuentra registrada`
        })
    }
    
    const data = {
        nombre,
        usuario: req.usuario
    }

    const categoria = new Categoria(data);
    await categoria.save();

    res.status(201).json({
        ok: true,
        categoria
    })
}

const todaslasCategorias = async( req = request, res = response ) => {

    const { limit, desde } = req.query;

  /*    const categorias = await Categoria.find({ estado: true })
                            .skip(Number(desde))
                            .limit(Number(limit))
                            .populate('usuario')
    const totalRegistros = await Categoria.countDocuments({estado: true}) 

 */     const [ totalRegistros, categorias ] = await Promise.all([
        Categoria.countDocuments({estado:true}),
        Categoria.find({ estado: true })
                            .skip(Number(desde))
                            .limit(Number(limit))
                            .populate('usuario', 'nombre')//Con esto se relaciona con la coleccion o usuario que hizo la modificacion
    ]) 


    res.json({
        totalRegistros,
        categorias
    })

}

const buscarCategoriaID = async( req = request, res = response ) => {

    const { id } = req.params;
    const categoria = await Categoria.findById( id );
    
    res.json({
        ok: true,
        categoria
    })

}

const editarCategoria = async( req = request, res = response ) => {

    const { id } = req.params;
    const { estado, usuario, nombre } = req.body;
    const nombreGrabar = nombre.toUpperCase();
    const categoria = await Categoria.findByIdAndUpdate(id, { nombre: nombreGrabar }, { new: true });
    
    res.json({
        ok: true,
        categoria
    })

}

const eliminarCategoria = async( req = request, res = response)  => {
    const { id } = req.params;
    
    const categoria = await Categoria.findByIdAndUpdate(id, { estado: false })
    
    res.json({
        ok: true,
        msg: `Usuario ${categoria.nombre} eliminado!`,
    })
}


module.exports = {
    crearCategoria,
    todaslasCategorias,
    buscarCategoriaID,
    editarCategoria,
    eliminarCategoria
}