'use strict'

const express = require('express')

const userRouter = express.Router()

const userController = require('../controllers/userController')


userRouter.route('/auth/users')
.get((req, res) => userController.getUsers(req, res))



userRouter.route('/auth/users/:cpf')
.get((req, res) => userController.getUser(req, res))
.delete((req, res) => userController.deleteUserById(req, res))

userRouter.route('/auth/register')
.post((req, res) => userController.createUser(req, res))

userRouter.route('/auth/update/:cpf')
.put((req, res) => userController.updateUser(req, res))

userRouter.route('/auth/login')
.post((req, res) => userController.loginUser(req, res))


module.exports = userRouter