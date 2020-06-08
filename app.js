// Requires
var express = require('express');
var mongoose = require('mongoose');

// Inicializando variables

var app = express();

// Conexcion a la base de datos
mongoose.connection.openUri('mongodb://localhost:27017/hospitalDB', (err, res) => {

    if (err) throw err;
    console.log('Base de datos: \x1b[2m%s\x1b[0m', 'online');

});

// Rutas

app.get('/', (request, response, next) => {

    response.status(200).json({
        ok: true,
        mensaje: 'Peticion realizada correctamente...'
    });
});


// Escuchando peticion de inicio

app.listen(3000, () => {
    console.log('Servidor online en el puerto 3000: \x1b[2m%s\x1b[0m', 'online');
});