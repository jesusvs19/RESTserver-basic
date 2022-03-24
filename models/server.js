const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/confing');


class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        // conexion a la base de datos
        this.conectarDB();
        // Middlewares Es una funcion que se ejecuta antes de mis rutas y mis controladores
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
    
    async conectarDB(){
        dbConnection()
    }

    routes(){
        this.app.use('/api/usuarios',require('../routes/usuarios'));
        this.app.use('/api/auth',require('../routes/auth'));
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`http://localhost:${this.port}`);
        })
    }
}

module.exports = Server