const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();

const { getMedicos, crearMedico, actualizarMedico, borrarMedico } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');


router.get('/', validarJWT, getMedicos);
router.post('/', [

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