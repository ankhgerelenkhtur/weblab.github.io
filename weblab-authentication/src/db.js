const { Pool } = require('pg');
require('dotenv').config();

const pool = new Pool({
    user: process.env.DB_USER || 'ankhgerel',
    host: process.env.DB_HOST || 'localhost',
    database: process.env.DB_NAME || 'movie',
    password: process.env.DB_PASSWORD || '12345678',
    port: process.env.DB_PORT || 5432,
});

module.exports = pool;
