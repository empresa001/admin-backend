const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', validarJWT, getMedicos);
router.post('/', [
        validarJWT,
        check('nombre', 'El nombre del medico es necesario').not().isEmpty(),
        check('hospital', 'El ID del hospital debe ser valido').isMongoId(),
        validarCampos
    ],
    crearMedico
);

router.put('/:id', [

    ],
    actualizarMedico
);

router.delete('/:id', [

    ],
    validarJWT,
    borrarMedico
);

module.exports = router;