const { response } = require('express');
var bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

let Pool = require("informixdb").Pool,
    pool = new Pool(),
    connStr = process.env.CDC;

const getMonedas = async(req, res) => {
    const desde = Number(req.query.desde) || 0;
    await pool.open(connStr, function(err, db) {

        db.query("select * from monedas", function(err, rows, sqlca) {
            if (err) {
                console.log(err);
            } else {
                console.log(rows);
            }
        });
        /* 
                db.json({
                    monedas: rows
                }); */
    });
};
module.exports = {
    getMonedas,
};