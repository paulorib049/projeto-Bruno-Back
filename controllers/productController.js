const Product = require('../models/Product')

module.exports= {
    deleteProduct: async (req, res) => {
        try {
            const result = await Product.deleteOne({id: req.params.id})
            res.status(200).send({message: "produto removido com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o produto"})
        }
    },
    getProduct: async (req, res) => {
        try {
            const result = await Product.findOne({id: req.params.id})
            res.status(200).send(result)
        } catch (err) {
            res.status(500).json({message: "Não foi possível recuperar o produto no momento"})
        }
    },
    updateProduct: async (req, res) => {
        try{
            const result = await Product.findOneAndUpdate({id: req.params.id}, req.body)
            res.status(200).send({ message: "Produto atualizado!" })
        } catch (err) {
          res.status(500).json({ message: "Não foi possível atualizar o produto" })
        }
        },
    createProduct: async (req, res) => {
        const {nome, valor, tipo, id, validade, precoPromo} = req.body
        const product = new Product({
            nome,
            valor,
            tipo,
            id,
            validade,
            precoPromo
        })
    
        try{
            await product.save()
    
            res.status(201).json({msg: 'produto criado com sucesso!'})
        }catch(error){
            console.log(error)
            res.status(500).json({msg: 'aconteceu um erro no servidor, tente novamente mais tarde'})
        }
    }
}