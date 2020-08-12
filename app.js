// Requires
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { dbConnection } = require('./database/config');

// var mongoose = require('mongoose');
// var bodyParser = require('body-parser');

// Creando servidor express
var app = express();

// Configurando CORS
app.use(cors());

// lectura y parseo
app.use(express.json());

dbConnection();

// Importando rutas
/* var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes'); */

// Rutas segundo version
app.use('/api/usuarios', require('./routes/usuario'));
app.use('/api/login', require('./routes/auth'));

// Conexcion a la base de datos
/* mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;
    console.log('Base de datos: \x1b[2m%s\x1b[0m', 'online');

}); */

// Server index config
/* var serveIndex = require('serve-index');
app.use(express.static(__dirname + '/'));
app.use('/uploads', serveIndex(__dirname + '/uploads')); */

// Rutas
/* app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes); */

// app.use('/', appRoutes);

// Escuchando peticion de inicio

app.listen(process.env.PORT, () => {
    console.log('Servidor online en el puerto 3000: \x1b[2m%s\x1b[0m', 'online');
});