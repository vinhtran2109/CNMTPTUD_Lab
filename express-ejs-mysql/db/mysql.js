const mysql = require('mysql2');

// Create connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', 
  database: 'productdb', 
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Get promise-based pool
const promisePool = pool.promise();

// Test connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err.message);
  } else {
    console.log('Successfully connected to MySQL database');
    connection.release();
  }
});

module.exports = promisePool;
