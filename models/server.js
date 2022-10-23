const express = require('express');
const cors = require('cors');

class Server{
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        //middlewares
        this.middlewares();
        
        
        this.routes();

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
        this.app.use('/api/users', require('../routes/users.routes'));
    }

}

module.exports = Server