'use strict'

const express = require('express')

const productRouter = express.Router()

const productController = require('../controllers/productController')

productRouter.route('/api/products')
.post((req, res) => productController.createProduct(req, res))

productRouter.route('/api/product/:id')
.put((req, res) => productController.updateProduct(req, res))

productRouter.route('/api/products/:id')
.delete((req, res) => productController.deleteProduct(req, res))

productRouter.route('/api/product/:id')
.get((req, res) => productController.getProduct(req, res))




module.exports = productRouter