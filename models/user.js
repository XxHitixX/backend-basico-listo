const { Schema, model } = require('mongoose');


const usuarioSchema = Schema({
    nombre : {
        type: String,
        required: [true, 'EL nombre es obligatorio']
    },
    correo : {
        type: String,
        required: [true, 'EL correo es obligatorio'],
        unique: true
    },
    password : {
        type: String,
        required: [true, 'El password es obligatorio']
    },
    imagen : {
        type: String
    },
    rol : {
        type: String,
        enum: ['ADMIN_ROL', 'USER_ROL']
    },
    estado : {
        type: Boolean,
        default: true,
    },
    google : {
        type: Boolean,
        default: false,
    },
})

/* usuarioSchema.methods.toJSON = function() {
    const { __v, password, ...usuario } = this.Object();
    return usuario;
}
 */
usuarioSchema.methods.toJSON = function() {
    const { __v, password, _id, ...usuario  } = this.toObject();
    usuario.uid = _id;
    return usuario;
}

module.exports = model('Usuario', usuarioSchema)