const mongoose = require('mongoose')

const User = mongoose.model('User', {
    cpf: Number,
    name: String,
    email: String,
    password: String,
})

module.exports = User