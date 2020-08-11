const { response } = require('express');
var bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');

const getUsuarios = async(req, res) => {
    const usuarios = await Usuario.find({}, 'nombre email role google');
    res.json({

        ok: true,
        usuarios: usuarios,
        msg: 'getUsuarios'

    });
};

const crearUsuarios = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if (existeEmail) {
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya esta registrado'
            });
        }

        const usuario = new Usuario(req.body);

        // Encriptar contrasena
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();
        res.json({

            ok: true,
            usuario: usuario

        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado... revisar logs'
        });
    }
};

const actualizarUsuarios = async(req, res = response) => {

    const uid = req.params.id;

    try {

        res.json({
            ok: true,
            uid
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado...'
        });
    }
};

module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios
};