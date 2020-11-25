const MonedaSchema = {
    moneda: {
        type: String,
        required: true,
        unique: true
    },
    des: {
        type: String,
        required: true,
    },
}

module.exports = {
    MonedaSchema
}