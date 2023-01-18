const { model, Schema } = require('mongoose');

const clienteSchema = Schema({
    nombre: {
        type: String,
        required: true
    },
    cedula: {
        type: String,
    },
    telefono: {
        type: String,
        required: true
    },
    correo: {
        type: String,
        default: 'john_doe@sistemprint'
    },
    direccion: {
        type: String,
        default: 'av. Siempre viva 123'
    },
    estado: {
        type: Boolean,
        default: true
    }
});

clienteSchema.methods.toJSON = function(){
    
    const { _id, __v, estado, ...resto } = this.toObject();
    resto.id = _id;
    return resto;
}

module.exports = model('Cliente', clienteSchema);
