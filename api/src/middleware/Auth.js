const authHeaderExists  = (req, res, next) => {
  const authHeader = req.headers['authorization']

  if (!authHeader) {
    res.status(401).send()
  }

  const token = authHeader.split(/\s+/).pop() || ''
  const auth = new Buffer.from(token, 'base64').toString() || ''
  const parts = auth.split(/:/) || []

  req.username = parts[0]
  req.password = parts[1]

  next()
}

module.exports = {
  authHeaderExists
}