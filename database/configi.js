let Pool = require("informixdb").Pool,
    pool = new Pool(),
    connStr = process.env.CDC;

const dbConnectionInformix = async() => {


    await pool.open(connStr, function(err, db) {
        if (err) {
            return console.log(err);
        } else {
            console.log('%c DB Informix Online', 'color:green; font-size:1.7;font-family:Arial');
        }
    });


}
module.exports = {
    dbConnectionInformix: dbConnectionInformix
};