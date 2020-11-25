const { Router } = require('express');
const { check } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');


const router = Router();


const { getMonedas } = require('../controllers/monedas');
const { validarJWT, validarADMIN_ROLE, validarADMIN_ROLE_o_MismoUsuario } = require('../middlewares/validar-jwt');

router.get('/', validarJWT, getMonedas);
/* router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo electronico es obligatorio').not().isEmail(),
        validarCampos,
    ],
    crearUsuarios
);

router.put('/:id', [
        validarJWT,
        validarADMIN_ROLE_o_MismoUsuario,
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'La correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validarCampos,
    ],
    actualizarUsuarios
);

router.delete('/:id', [validarJWT, validarADMIN_ROLE],
    borrarUsuarios
); */

module.exports = router;