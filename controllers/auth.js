const { response } = require('express');
const bcrypt = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');
const { getMenu } = require('../helpers/menu');

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        // Verifica email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: 'Email no valida'
            });
        }

        // Verifica contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Contraseña no valida'
            });
        }

        // Generar TOKEN -JWT
        const token = await generarJWT(usuarioDB.id);

        res.json({
            ok: true,
            token,
            menu: getMenu(usuarioDB.role)
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Error en la el logueo'
        });
    }
};

const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify(googleToken);

        // Verificacion de cuenta 
        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if (!usuarioDB) {
            usuario = new Usuario({
                nombre: name,
                email: email,
                password: '@@@',
                img: picture,
                google: true
            });
        } else {
            usuario = usuarioDB;
            usuario.google = true;
        }

        // Guarda en DB
        await usuario.save();

        // Generando JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            token,
            menu: getMenu(usuario.role)
        });

    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'Token  no es correcto',
        });
    }


};

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generando JWT
    const token = await generarJWT(uid);

    // Obtener datos del usuario
    const usuario = await Usuario.findById(uid);


    res.json({
        oK: true,
        token,
        usuario,
        menu: getMenu(usuario.role)
    });
};

module.exports = {
    login,
    googleSignIn,
    renewToken
};