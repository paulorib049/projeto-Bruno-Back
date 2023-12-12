const mongoose = require('mongoose')

const Product = mongoose.model('Product', {
    id: String,
    name: String,
    description: String,
    price: String,
    image: String
})

module.exports = Product