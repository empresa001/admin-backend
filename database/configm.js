const mongoose = require('mongoose');
// var informix = require('informixdb');

const dbConnectionMongosse = async() => {

    // Mongoose
    try {
        await mongoose.connect(process.env.DB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log('%c DB Mongoose Online', 'color:green; font-size:1.7;font-family:Arial');
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }
};

module.exports = {
    dbConnectionMongosse: dbConnectionMongosse
};