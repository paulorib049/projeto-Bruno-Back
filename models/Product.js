const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    nome: String,
    valor: Number,
    tipo: String,
    id: Number,
    precoPromo: Number,
    image: String
})

module.exports = Product