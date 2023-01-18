const { Schema, model } = require('mongoose');

const categoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        //Para establecer una relacion con la coleccion Usuario
        //type: Schema.Types.ObjectId,
        type: String,
        ref: 'Usuario',
        required: true
    }
});

categoriaSchema.methods.toJSON = function(){

    const { __v, ...categoria } = this.toObject();
    return categoria

}

module.exports = model('Categoria', categoriaSchema);


