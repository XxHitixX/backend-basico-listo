const { model, Schema } = require('mongoose');


const facturaSchema = Schema({

    fecha: {
        type: Date,
        default: Date.now
    },
    usuario: {
        type: String,
        ref: 'Usuario',
        required: ['true', 'El usuario es obligatorio']
    },
    cliente: {
        type: String,
        ref: 'Cliente',
        required: ['true', 'El cliente es obligatorio'],
        default: 'John Doe'
    },
    tipoPago: {
        type: String,
        enum: ['efectivo', 'tarjeta', 'transferencia'],
        default: 'efectivo'
    },
    estado: {
        type: Boolean,
        default: true
    },
    total: {
        type: Number
    },    
    items: [{
        producto: {
            type: String,
            ref: 'Producto'
        },
        cantidad: {
            type: Number,
            default: 1
        }
    }]


});

facturaSchema.methods.toJSON = function(){
    const { __v, ...factura } = this.toObject();
    return factura;
}


module.exports = model('Factura', facturaSchema);