const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //Conecto con la base de datos
        this.conectarDB();


        //middlewares
        this.middlewares();
        
        
        this.routes();

    }

    async conectarDB(){
        await dbConection();
    }

    middlewares(){

        //CORS
        this.app.use( cors() );

        //para leer y parsear lo que viene en el body de la petición
        this.app.use( express.json() )

        //Directorio público
        this.app.use( express.static('public') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server corriendo en puerto: ', this.port);
        })
    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/users.routes'));
    }

}

module.exports = Server