const { Schema, model } = require('mongoose');

const productoSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    proveedor: {
        type: String,
        default: 'N/A'
    },
    
    stock: {
        type: Number,
        default: 1
    },
    
    costo: {
        type: Number,
        default: 0,
    },
       
    usuario: {
        //Para establecer una relacion con la coleccion Usuario
        //type: Schema.Types.ObjectId,
        type: String,
        ref: 'Usuario',
        required: true
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: String,
        ref: 'Categoria',
        required: true
    },
    descripcion: { 
        type: String 
    },
    disponible: { type: Boolean, default: true },
    
});

productoSchema.methods.toJSON = function(){

    const { __v, ...producto } = this.toObject();
    return producto

}

module.exports = model('Producto', productoSchema);


