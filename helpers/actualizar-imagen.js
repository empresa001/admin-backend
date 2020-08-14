const fs = require('fs');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

const borrarImagen = (path) => {
    if (fs.existsSync(path)) {
        fs.unlinkSync(path);
    }
};

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathOld = '';

    switch (tipo) {
        case 'medicos':
            const medico = await Medico.findById(id);
            if (!medico) {
                console.log('No es un medico por id');
                return false;
            }
            pathOld = `./uploads/medicos/${ medico.img }`;
            borrarImagen(pathOld);

            medico.img = nombreArchivo;
            await medico.save();
            return true;
            break;

        case 'hospitales':
            const hospital = await Hospital.findById(id);
            if (!medico) {
                console.log('No es un hospital por id');
                return false;
            }
            pathOld = `./uploads/hospitales/${ hospital.img }`;
            borrarImagen(pathOld);

            hospital.img = nombreArchivo;
            await hospital.save();
            return true;
            break;

        case 'usuarios':
            const usuario = await Usuario.findById(id);
            if (!usuario) {
                console.log('No es un usuario por id');
                return false;

            }
            pathOld = `./uploads/usuarios/${ usuario.img }`;
            borrarImagen(pathOld);

            usuario.img = nombreArchivo;
            await usuario.save();
            return true;
            break;
    }

}

module.exports = {
    actualizarImagen
}