const Rol = require('../models/rol');
const Usuario = require('../models/user');


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


module.exports = {
    validarRol,
    emailExiste,
    existeUsuarioPorID
}



