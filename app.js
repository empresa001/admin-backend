// Requires
var express = require('express');

// Cambio 2 en actualizacion de curso
require('dotenv').config();

// Cambio 1 en actualizacion de curso
const { dbConnection } = require('./database/config');

// var mongoose = require('mongoose');
var bodyParser = require('body-parser');

const cors = require('cors');

// Inicializando variables
var app = express();

dbConnection();

// Configuracion CORS
const corsOptions = {
    origin: 'http://localhost:4200', // Aquí va el origen, puede ser un arreglo
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}; //???

app.use(cors(corsOptions));
/* app.all('*', function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

    if (req.method == 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
}); */

// BodyParser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Importando rutas
var appRoutes = require('./routes/app');
var usuarioRoutes = require('./routes/usuario');
var loginRoutes = require('./routes/login');
var hospitalRoutes = require('./routes/hospital');
var medicoRoutes = require('./routes/medico');
var busquedaRoutes = require('./routes/busqueda');
var uploadRoutes = require('./routes/upload');
var imagenesRoutes = require('./routes/imagenes');

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
app.use('/usuario', usuarioRoutes);
app.use('/hospital', hospitalRoutes);
app.use('/medico', medicoRoutes);
app.use('/login', loginRoutes);
app.use('/busqueda', busquedaRoutes);
app.use('/upload', uploadRoutes);
app.use('/img', imagenesRoutes);

app.use('/', appRoutes);

// Escuchando peticion de inicio

app.listen(process.env.PORT, () => {
    console.log('Servidor online en el puerto 3000: \x1b[2m%s\x1b[0m', 'online');
});