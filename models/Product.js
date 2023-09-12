const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    nome: String,
    valor: Number,
    tipo: String,
    id: Number,
    validade: Number,
    precoPromo: Number
})

module.exports = Product