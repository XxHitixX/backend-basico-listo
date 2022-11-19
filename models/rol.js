

const { model, Schema } = require('mongoose');

const RolSchema = Schema({
    rol: {
        type: String
    }
})


module.exports = model('Rol', RolSchema);