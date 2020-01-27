const uuid = require('uuid/v4')

const login = (req, res) => {
  // TODO() check auth should be abstracted to DB
  if (req.username !== 'username' || req.password !== 'password') {
    res.status(401).send()
  }

  const token = uuid()

  // TODO() save token to db

  res.send(token)
}

const validateAuth = (req, res) => {
  // TODO() check token against DB (it both exists and is correct)
  if (!req.headers['user-token']) {
    res.status(401).send()
  }

  res.send('successfully logged in still!')
}

module.exports = {
  login,
  validateAuth
}

