//importando as parada
require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const app = express()

//para ler o json
app.use(express.json())

//importando da classe User do models
const User = require('./models/User')

//Rota pública entrando
app.get('/', (req, res) =>{
    res.status(200).json({msg: 'bem vindo a nossa API!'})
})
const productRouter = require('./routers/productRouter')
const userRouter = require('./routers/userRouter')

app.use(userRouter)
app.use(productRouter)

//pegando o login e senha da past env pois ela esta no gitignore por motivos de segurança
const dbUser = process.env.DB_USER
const dbPassword = process.env.DB_PASS

//conectando ao banco com login e senha
mongoose.connect(`mongodb+srv://${dbUser}:${dbPassword}@cluster0.wxxottw.mongodb.net/?retryWrites=true&w=majority`)
.then(()=>{
    app.listen(3000)
    console.log("conectou ao banco!")
})
.catch((err)=> console.log(err))




