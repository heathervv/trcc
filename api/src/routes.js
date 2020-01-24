var express = require("express")
var routes = express()

routes.listen(3001)

routes.get('/api/auth/login', (req, res) => {
  // TODO()
  res.send("logging user in")
})

routes.get('/api/auth', (req, res) => {
  // TODO()
  res.send("validating user auth")
})