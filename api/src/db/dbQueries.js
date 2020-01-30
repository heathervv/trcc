const { db } = require('./db')

const findUserByCredentials = async (username, password) => {
  await db.one(`select * from users where username = '${username}' and password = crypt('${password}', password)`)
    .then((response) => response)
    .catch((err) => { throw (err) })
}

const findUserByToken = async (token) => {
  await db.one(`select * from users where token = '${token}'`)
    .then((response) => response)
    .catch((err) => { throw (err) })
}

const storeUserSession = async (username, password, token) => {
  await db.one(`update users set token = '${token}' where username = '${username}' and password = crypt('${password}', password)`)
    .then((response) => response)
    .catch((err) => { throw (err) })
}

module.exports = {
  findUserByCredentials,
  findUserByToken,
  storeUserSession
}
