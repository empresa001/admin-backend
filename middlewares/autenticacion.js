var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
// ========================================
// Verificar token (Middlewares)
// ========================================

exports.verificaToken = function(req, res, next) {

    var token = req.query.token;
    jwt.verify(token, SEED, (err, decoded) => {

        if (err) {
            return res.status(401).json({
                ok: true,
                mensaje: 'Token incorrecto',
                errors: err
            });
        }

        req.usuario = decoded.usuario;

        next();
        /*         res.status(200).json({
                    ok: true,
                    decoded: decoded
                }); */
    });

}

/* app.use('/', (req, res, next) => {


}); */