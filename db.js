const { Pool } = require('pg');

const pool = new Pool({
  user: 'artur',
  host: 'localhost',
  database: 'taskmanagement',
  password: '123456',
  port: 5432,
});

const getClient = async () => {
  const client = await pool.connect();
  return client;
};

module.exports = {
  pool,
  getClient,
};