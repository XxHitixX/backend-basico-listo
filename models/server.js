const express = require('express');
const cors = require('cors');
const { dbConection } = require('../database/config');

class Server{
    
    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.RutasPath = {
            usuarios:   '/api/users',
            auth:       '/api/auth',
            categoria:  '/api/categorias',
            producto:   '/api/productos',
            cliente:   '/api/clientes',
            factura:   '/api/facturas',
            buscar:   '/api/buscar',
            acabarse: '/api/acabarse'
        }
        /* this.usuariosPath = '/api/users';
        this.authPath = '/api/auth' */

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
        this.app.use(this.RutasPath.usuarios, require('../routes/users.routes'));
        this.app.use(this.RutasPath.auth, require('../routes/auth.routes'));
        this.app.use(this.RutasPath.categoria, require('../routes/categorias.routes'));
        this.app.use(this.RutasPath.producto, require('../routes/productos.routes'));
        this.app.use(this.RutasPath.cliente, require('../routes/cliente.routes'));
        this.app.use(this.RutasPath.buscar, require('../routes/buscar.routes'));
        this.app.use(this.RutasPath.factura, require('../routes/factura.routes'));
        this.app.use(this.RutasPath.acabarse, require('../routes/acabarse.routes'));
    }

}

module.exports = Server