const Product = require('../models/Product')

module.exports= {
    deleteProduct: async (req, res) => {
        try {
            const result = await Product.deleteOne({price: req.params.id})
            res.status(200).send({message: "produto removpriceo com sucesso!"})
        } catch (err) {
            res.status(500).json({message: "Não foi possível remover o produto"})
        }
    },
    getProducts: async (req, res) => {
    try {
      const products = await Product.find();
      res.status(200).json(products);
    } catch (err) {
      res.status(500).json({ message: 'Não foi possível recuperar os produtos' });
    }
  },
    updateProduct: async (req, res) => {
        try{
            const result = await Product.findOneAndUpdate({price: req.params.id}, req.body)
            res.status(200).send({ message: "Produto atualizado!" })
        } catch (err) {
          res.status(500).json({ message: "Não foi possível atualizar o produto" })
        }
        },
    createProduct: async (req, res) => {
        const {id, name, description, price, image} = req.body
        const product = new Product({
            id,
            name,
            description,
            price,
            image
        })
    
        try{
            await product.save()
    
            res.status(201).json({msg: 'produto criado com sucesso!'})
        }catch(error){
            console.log(error)
            res.status(500).json({msg: 'aconteceu um erro no servpriceor, tente novamente mais tarde'})
        }
    }
}