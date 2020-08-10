const { Router } = require('express');
const { check } = require('express-validator');
const { getUsuarios, crearUsuarios } = require('../controllers/usuarios');

const router = Router();

var bcrypt = require('bcryptjs');

var mdAutenticacion = require('../middlewares/autenticacion');

var Usuarios = require('../models/usuario');

// ========================================
// Obtiene todos los usuarios
// ========================================

/* Ruta: /api/usuarios*/

router.get('/', getUsuarios);
router.post('/', [
        check('nombre', 'El nombre es obligatorio').not().isEmpty(),
        check('password', 'La contraseña es obligatoria').not().isEmpty(),
        check('email', 'El correo electronico es obligatorio').not().isEmpty(),
    ],
    crearUsuarios
);

/* router.get('/', (request, response, next) => {

    var desde = request.query.desde || 0;
    desde = Number(desde);

    Usuarios.find({}, 'nombre email img, role')
        .skip(desde)
        .limit(5)
        .exec(
            (err, usuarios) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error en coleccion ususarios',
                        errors: err
                    });
                }

                Usuarios.count({}, (err, conteo) => {

                    response.status(200).json({
                        ok: true,
                        usuarios: usuarios,
                        totalUsuarios: conteo
                    });
                });

            });
});

// ========================================
// Crear un nuevo usuarios
// ========================================

app.post('/', (request, response, next) => {

    var body = request.body;

    var usuario = new Usuarios({

        nombre: body.nombre,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        img: body.img,
        role: body.role

    });

    usuario.save((err, usuarioGuardado) => {

        if (err) {
            return response.status(400).json({
                ok: false,
                mensaje: 'Error al crear usuario',
                error: err
            });
        }

        response.status(201).json({
            ok: true,
            usuario: usuarioGuardado,
            usuariotoken: request.usuario
        });
    });

});


// ========================================
// Actualizar un nuevo usuarios
// ========================================

app.put('/:id', mdAutenticacion.verificaToken, (request, response) => {

    var id = request.params.id;
    var body = request.body;

    Usuarios.findById(id, (err, usuario) => {

        if (err) {
            return response.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuario) {
            return response.status(400).json({
                ok: false,
                mensaje: 'El usuario con el id' + id + 'no existe',
                errors: { message: 'No existe un usuario con ese ID' }
            });
        }

        usuario.nombre = body.nombre;
        usuario.email = body.email;
        usuario.role = body.role;

        usuario.save((err, usuarioGuardado) => {

            if (err) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'Error al actualizar usuario',
                    errors: err
                });
            }

            usuarioGuardado.password = ':)';

            response.status(200).json({
                ok: true,
                usuario: usuarioGuardado
            });

        });

    });

    // ========================================
    // Borrar un usuarios por ID
    // ========================================

    app.delete('/:id', mdAutenticacion.verificaToken, (request, response, next) => {

        var id = request.params.id;

        Usuarios.findByIdAndDelete(id, (err, usuarioBorrado) => {

            if (err) {
                return response.status(500).json({
                    ok: false,
                    mensaje: 'Error al borrar usuario',
                    errors: err
                });
            }

            if (!usuarioBorrado) {
                return response.status(400).json({
                    ok: false,
                    mensaje: 'No existe un usuario con ese ID',
                    errors: { message: 'No existe un usuario con ese id' }
                });
            }

            response.status(200).json({
                ok: true,
                usuario: usuarioBorrado
            });

        });

    });

});*/

module.exports = router;