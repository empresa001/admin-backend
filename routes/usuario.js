var express = require('express');
var bcrypt = require('bcryptjs');

var app = express();

var Usuarios = require('../models/usuario');

// ========================================
// Obtiene todos los usuarios
// ========================================

app.get('/', (request, response, next) => {

    Usuarios.find({}, 'nombre email img, role')
        .exec(
            (err, usuarios) => {
                if (err) {
                    return response.status(500).json({
                        ok: false,
                        mensaje: 'Error en coleccion ususarios',
                        errors: err
                    });
                }


                response.status(200).json({
                    ok: true,
                    usuarios: usuarios
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
            usuario: usuarioGuardado
        });
    });

});

// ========================================
// Actualizar un nuevo usuarios
// ========================================

app.put('/:id', (request, response) => {

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

    app.delete('/:id', (request, response, next) => {

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

});

module.exports = app;