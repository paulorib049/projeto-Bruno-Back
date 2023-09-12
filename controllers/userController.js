const User = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports= {
    getUsers: (req, res) => {
        User.find({}).select(["-__v", "-_id"]).then((result) => {

            res.status(200).json(result)
        }).catch(() => {
            res.status(500).json({message: "Não foi possível recuperar os usuarios"})
        })
    },
    deleteUserById: async (req, res) => {
        try {
            const result = await User.deleteOne({cpf: req.params.cpf})
            res.status(200).send({message: "usuarios removido com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o usuario"})
        }
    },
    getUser: async (req, res) => {
        try {
            const result = await User.findOne({cpf: req.params.cpf})
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível recuperar o usuário no momento"})
        }
    },
    updateUser: async (req, res) => {
    try{
        const result = await User.findOneAndUpdate({cpf: req.params.cpf}, req.body)
        res.status(200).send({ message: "Usuário atualizado!" })
    } catch (err) {
      res.status(500).json({ message: "Não foi possível atualizar o usuário" })
    }
    },
    //Criar um usuarios
    createUser: async (req, res) => {
        const {cpf, name, email, password, confirmpassword, type} = req.body
    
        //validações
        if(!cpf){
            return res.status(422).json({msg:'o cpf é obrigatório!'})
        }
        if(!name){
            return res.status(422).json({msg:'o nome é obrigatório!'})
        }
        if(!email){
            return res.status(422).json({msg:'o email é obrigatório!'})
        }
        if(!password){
            return res.status(422).json({msg:'a senha é obrigatória!'})
        }
        if(password != confirmpassword){
            return res.status(422).json({msg:'as senhas não conferem!'})
        }
        if(!type){
            return res.status(422).json({msg:'o tipo é obrigatório!'})
        }
    
        //validando usuario
        const userExists = await User.findOne({email:email})
    
        if(userExists){
            return res.status(422).json({msg:'tente outro emaal!'})
        }
    
        //criando senha
        const salt = await bcrypt.genSalt(12)
        const passwordHash = await bcrypt.hash(password, salt)
    
        //criando usuario
        const user = new User({
            cpf,
            name,
            email,
            password: passwordHash,
            type
        })
    
        try{
            await user.save()
    
            res.status(201).json({msg: 'usuário criado com sucesso!'})
        }catch(error){
            console.log(error)
            res.status(500).json({msg: 'aconteceu um erro no servidor, tente novamente mais tarde'})
        }
    },
    loginUser: async(req, res) => {
        const {email, password} = req.body
    //validação
    if(!email){
        return res.status(422).json({msg:'o email é obrigatório!'})
    }
    if(!password){
        return res.status(422).json({msg:'a senha é obrigatória!'})
    }

    //checando se o email e senha sao validos
    const user = await User.findOne({email: email})
    if(!user){
        return res.status(422).json({msg:'email nao encontrado!'})
    }

    const checkpassword = await bcrypt.compare(password, user.password)
    if(!checkpassword){
        return res.status(422).json({msg: 'senha invalida'})
    }

    try{
        const secret = process.env.SECRET

        const token = jwt.sign(
        {
            id: user._id,
        },
        secret
        )
        res.status(200).json({msg: ' autenticação realizada com sucesso!', token})

    }catch(error){
        console.log(error)
        res.status(500).json({msg: 'aconteceu um erro no servidor, tente novamente mais tarde'})
    }

}
    }
