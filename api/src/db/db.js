const pgp = require('pg-promise')()

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'trcc'
  // user: 'TODO',
  // password: 'TODO'
})

module.exports = {
  pgp, db
}