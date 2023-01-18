const { Categoria, Rol, Producto, Usuario, Cliente, Factura } = require('../models');


const validarRol = async(rol = '') => {

    const existeRol = await Rol.findOne({rol});
    
    if( !existeRol ){
        throw new Error(`El rol ${rol} no está permitido, no esta en la BD`);
    }
}

const emailExiste = async( correo ) => {
    
    const existeCorreo = await Usuario.findOne({ correo });

    if( existeCorreo ){
        throw new Error(`El correo ${ correo }, ya está en la base de datos `)
       /*  return res.status(400).json({
            ok: false,
            msg: 'El correo ya existe en la base de datos'
        }) */
    }

}

const existeUsuarioPorID = async(id) => {

    const existeUsuario = await Usuario.findById(id);

    if( !existeUsuario ){
        throw new Error(`No se ha encontrado el usuario con ID: ${id}`)
    }

}

const existeCategoriaPorID = async(id) => {
    const existeCategoria = await Categoria.findById(id);

    if( !existeCategoria ){
        throw new Error(`No se ha encontrado la categoría que estas buscando con ID: ${ id }`)
    }

}

const existeProductoPorID = async(id) => {
    const existeProducto = await Producto.findById(id);

    if( !existeProducto ){
        throw new Error(`No se ha encontrado el producto que estas buscando con ID: ${ id }`)
    }

}

const existeClientePorID = async(id) => {
    const existeCliente = await Cliente.findById(id);

    if( !existeCliente ){
        throw new Error(`No se ha encontrado el cliente que estas buscando con ID: ${ id }`)
    }

}

const existeFacturaPorID = async(id = '') => {
    const existeFactura = await Factura.findById(id);

    if( !existeFactura ){
        throw new Error(`No se ha encontrado la factura que estas buscando con ID: ${ id }`)
    }

}


module.exports = {
    validarRol,
    emailExiste,
    existeUsuarioPorID,
    existeCategoriaPorID,
    existeProductoPorID,
    existeClientePorID,
    existeFacturaPorID
}



