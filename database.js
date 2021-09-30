const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'postgres',
  password: 'Reximus1234Prime!@#$',
  host: 'localhost',
  port: 5432,
  database: 'atelier_db'
});

module.exports = pool;