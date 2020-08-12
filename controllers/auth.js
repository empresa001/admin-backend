const { response } = require('express');

const login = async(req, res = response) => {

    try {
        res.json({
            ok: true,
            msg: 'Hola mundo'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'error en la el logueo'
        })
    }
};

module.exports = {
    login
};