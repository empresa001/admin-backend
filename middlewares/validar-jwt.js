const { response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = (req, res = response, next) => {

    // Leer el TOKEN
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No Existe TOKEN'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;

        next();


    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no valido'
        });
    }
};

const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;

    try {

        const usuarioBD = await Usuario.findById(uid);

        if (!usuarioBD) {
            return res.status(404).json({
                ok: false,
                mgs: 'Usuario no existe'
            });
        }

        if (usuarioBD.role !== 'ADMIN_ROLE') {
            return res.status(403).json({
                ok: false,
                mgs: 'Usuario sin privilegio de administrador'
            });
        }

        next();


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'No tienen los privilegios para acceder'
        });
    }
};

module.exports = {
    validarJWT,
    validarADMIN_ROLE
};