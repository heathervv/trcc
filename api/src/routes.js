const express = require("express")
const routes = express()

const AuthMiddleware = require('./middleware/Auth')
const AuthController = require('./auth/AuthController')

routes.listen(3001)

routes.get('/api/auth/login', AuthMiddleware.exists, AuthController.login)

routes.get('/api/auth', AuthMiddleware.exists, AuthController.validateAuth)