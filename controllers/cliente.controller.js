const { request, response } = require("express");
const { Cliente } = require('../models');


const crearCliente = async(req = request, res = response) => {

    const { estado, ...body } = req.body;
    
    try {

        const clienteDB = await Cliente.findOne({ nombre: body.telefono })

    if( clienteDB ) {
        return res.status(400).json({
            ok: false,
            msg: `El nombre ${ body.nombre}, ya está registrado en la base de datos con el teléfono ${ body.telefono }.` 
        })
    }

/*     if( ClienteDB.proveedor === body.proveedor ){
        return res.status(400).json({
            ok: false,
            msg: `El nombre ${ body.nombre}, ya está registrado en la base de datos con el mismo proveedor.` 
        })
    } */

    const data = {
        nombre: body.nombre,
        cedula: body.cedula,
        telefono: body.telefono,
        correo: body.correo,
        direccion: body.direccion,
        estado: true,

    }

    const cliente = new Cliente(data);

    await cliente.save();

    res.json({
        ok: true,
        msg: 'creado',
        cliente
    })
        
    } catch (error) {
        console.log(error);
        throw new Error('Ha ocurrido un error al crear el cliente. Contacte con el administrador');

    }

    
}

const obtenerClientes = async(req = request, res = response) => {
    
    const { desde = 0, limite = 5 }  = req.query;

    const [ totalClientes, clientes ] = await Promise.all([
        Cliente.countDocuments({ estado: true }),
        Cliente.find({ estado: true })
                .skip(Number(desde))
                .limit(Number(limite))
    ])
    
    
    res.json({
        ok: true,
        totalClientes,
        clientes
    })
}

const obtenerCliente = async(req = request, res = response) => {

    const { id } = req.params;
    
    const cliente = await Cliente.findById(id);
    
    res.json(cliente)
}

const actualizarCliente = async(req = request, res = response) => {
   
    const { id } = req.params;
    const { estado, usuario, ...body } = req.body;

    const data = {
        nombre: body.nombre,
        cedula: body.cedula,
        telefono: body.telefono,
        correo: body.correo,
        direccion: body.direccion,
        estado: true,
    }

    const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true });
   
    res.json({
        ok: true,
        msg: 'Actualizado',
        cliente
    })
}

const eliminarCliente = async(req = request, res = response) => {
    
    const { id } = req.params;

    await Cliente.findByIdAndUpdate( id , {estado:false} );

    res.json({
        ok: true,
        msg: 'Cliente eliminado'
    })
}

module.exports = {
    crearCliente,
    obtenerClientes,
    obtenerCliente,
    actualizarCliente,
    eliminarCliente

}
