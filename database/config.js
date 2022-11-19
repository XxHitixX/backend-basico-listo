const mongoose = require('mongoose');



const dbConection = async() => {

    try {

        await mongoose.connect( process.env.MONGO_CNN );
        console.log('Conectado a la base de datos');
        
    } catch (error) {
        console.log(error);
        throw new Error('No se ha podido conectar con la base de datos')       ;
    }
}



module.exports = {
    dbConection
}