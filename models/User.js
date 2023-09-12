const mongoose = require('mongoose')

const User = mongoose.model('User', {
    cpf: Number,
    name: String,
    email: String,
    password: String,
    type: { type: String, required: true, enum: ['client', 'employee'] }
})

module.exports = User