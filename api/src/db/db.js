const pgp = require('pg-promise')()

// TODO() setup psql to require a user and password

const db = pgp({
  host: 'localhost',
  port: 5432,
  database: 'trcc',
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD
})

module.exports = {
  pgp, db
}