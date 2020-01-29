const express = require("express")
const routes = express()

const AuthController = require('./auth/AuthController')

routes.listen(3001)

routes.get('/api/auth/login', AuthController.authHeaderExists, AuthController.login)

routes.get('/api/auth', AuthController.validateAuth)