var express = require("express")
var routes = express()

routes.listen(3000)

routes.get('/auth/login', (req, res) => {
  // TODO()
  res.send("logging user in")
})

routes.get('/auth', (req, res) => {
  // TODO()
  res.send("validating user auth")
})