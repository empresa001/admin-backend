/* var express = require('express');
var fs = require('fs');

var app = express();

var Usuario = require('../models/usuario');
var Medico = require('../models/medico');
var Hospital = require('../models/hospital');



});


    if (tipo === 'medicos') {

        Medico.findById(id, (err, medico) => {

            if (!medico) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Medico no existe',
                    errors: { message: 'Medico no existe' }
                });

            }



            });
        });
    }

    if (tipo === 'hospitales') {

        Hospital.findById(id, (err, hospital) => {

            if (!hospital) {

                return res.status(400).json({
                    ok: false,
                    mensaje: 'Hospital no hospital ',
                    errors: { message: 'Hospital no existe' }
                });

            }

            var pathOld = '../uploads/hospitales/' + hospital.img;

            if (fs.existsSync(pathOld)) {
                fs.unlink(pathOld);
            }

            hospital.img = nombreArchivo;
            hospital.save((err, hospitalActualizado) => {

                return res.status(200).json({
                    ok: true,
                    mensaje: 'Imagen de hospital actualizado',
                    hospital: hospitalActualizado
                });

            });


        });

    }

}

module.exports = app; */

/***************************/

/* Ruta: api/uploads/:busqueda/:id */

const { Router } = require('express');
const expressFileUpload = require('express-fileupload');

const { validarJWT } = require('../middlewares/validar-jwt');

const { fileUpload } = require('../controllers/uploads');


const router = Router();

router.use(expressFileUpload());

router.put('/:tipo/:id', validarJWT, fileUpload);

module.exports = router;