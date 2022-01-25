const express = require('express');
const cors = require('cors');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        // Middlewares
        this.middleware();

        // rutas de la aplicación
        this.routes();
    }

    middleware(){
        // CORS
        this.app.use( cors());

        // Lectura de pareseo en el body
        this.app.use(express.json()) 

        // directorio publico
        this.app.use(express.static('public'))
    }

    routes(){
        this.app.use('/api/usuarios',require('../routes/usuarios'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`);
        })
    }
}

module.exports = Server