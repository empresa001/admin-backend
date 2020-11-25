// Requires
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnectionMongosse } = require('./database/configm');
const { dbConnectionInformix } = require('./database/configi');

// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');

// Creando servidor express
var app = express();

// Configurando CORS
app.use(cors());

// lectura y parseo
app.use(express.json());

dbConnectionMongosse();
dbConnectionInformix();

// Directorio Publico
app.use(express.static('public'));

// Rutas segundo version
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/hospitales', require('./routes/hospitales'));
app.use('/api/medicos', require('./routes/medicos'));
app.use('/api/todo', require('./routes/busquedas'));
app.use('/api/upload', require('./routes/uploads'));
app.use('/api/login', require('./routes/auth'));

app.use('/api/monedas', require('./routes/monedas'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

// Escuchando peticion de inicio

app.listen(process.env.PORT, () => {
    console.log('Servidor online en el puerto 3000: \x1b[2m%s\x1b[0m', 'online');
});