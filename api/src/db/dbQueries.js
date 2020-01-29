const { db } = require('./db')

const findUserByCredentials = async (username, password) => {
  await db.one(`select * from users where username = '${username}' and password = crypt('${password}', password)`)
    .then((response) => response)
    .catch((err) => {
      throw (err)
    })
}

const findUserByToken = (token) => {
  // TODO()

  return true
}

const storeUserSession = (username, password, token) => {
  // TODO()

  return true
}

module.exports = {
  findUserByCredentials,
  findUserByToken,
  storeUserSession
}
