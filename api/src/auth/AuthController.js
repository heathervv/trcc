const uuid = require('uuid/v4')
const dbQueries = require('../db/dbQueries')

const authHeaderExists  = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    return res.status(401).send()
  }

  const token = authHeader.split(/\s+/).pop() || ''
  const auth = new Buffer.from(token, 'base64').toString() || ''
  const parts = auth.split(/:/) || []

  req.username = parts[0]
  req.password = parts[1]

  return next()
}

const login = async (req, res) => {
  const result = await dbQueries.findUserByCredentials(req.username, req.password)
    .then(() => {
      const token = uuid()

      // TODO() add session to token? (should it expire?)
      dbQueries.storeUserSession(req.username, req.password, token)

      return token
    })
    .catch(() => {
      res.status(401)
    })

  res.json(result)
}

const validateAuth = (req, res) => {
  const token = req.headers['user-token']

  if (!token || !dbQueries.findUserByToken(token)) {
    res.status(401).send()
  }

  res.send()
}

module.exports = {
  authHeaderExists,
  login,
  validateAuth
}

