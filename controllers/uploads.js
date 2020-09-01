const { response, request } = require("express");
const path = require('path');
const fs = require('fs');

const { v4: uuidv4 } = require('uuid');
const { actualizarImagen } = require("../helpers/actualizar-imagen");

const fileUpload = (req = request, res = response) => {

    const tipo = req.params.tipo;
    console.log(tipo);
    const id = req.params.id;

    // tipos de collection
    const tiposValidos = ['hospitales', 'medicos', 'usuarios'];

    if (!tiposValidos.includes(tipo)) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Tipo de coleccion no es valida',
            // errors: { message: 'Tipo de coleccion no es valida' }
        });
    }

    // Validacion de existencia de archivo
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'No selecciono ningun archivo',
            // errors: { message: 'Debe seleccionar una imagen' }
        });
    }

    // Obtener el nombre del archivo
    const file = req.files.img;

    // Extraer extencion
    const nombreCortado = file.name.split('.'); // david.1.12.jpg
    const extensionArchivo = nombreCortado[nombreCortado.length - 1];

    // Validacion de extension
    var extensionesValidas = ['png', 'jpg', 'jpeg', 'gif'];

    if (!extensionesValidas.includes(extensionArchivo) < 0) {
        return res.status(400).json({
            ok: false,
            mensaje: 'Archivo con extension no valida',
            // errors: { message: 'Debe seleccionar un archivo con extension valida como:' + extensionesValidas.join(', ') }
        });
    }

    // Nombre de archivo personalizado 
    //12345-123.png
    const nombreArchivo = `${uuidv4()}.${extensionArchivo}`; // ⇨ '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'

    //Path de la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;

    file.mv(path, err => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al mover la imagen',
                // errors: err
            });
        }

        // Actualizacion en la BD
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({

            ok: true,
            msg: 'Archivo subido',
            nombreArchivo

        });
    });
};

const retornaImagen = (req, res = response) => {

    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname, `../uploads/${tipo}/${foto}`);

    // Imagen por defecto
    if (fs.existsSync(pathImg)) {
        res.sendFile(pathImg);
    } else {
        const pathImg = path.join(__dirname, `../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }
}

module.exports = {
    fileUpload,
    retornaImagen
};