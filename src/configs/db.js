const mysql = require('mysql2');
const { host, user, database, password } = require('../helpers/env');
const { use } = require('../routes/product');

const connection = mysql.createConnection({
  host: host,
  user: user,
  password:password,
  database: database,
  dateStrings:'date'
})

module.exports = connection
