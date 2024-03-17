const mysql = require('mysql');

const pool = mysql.createPool({
  connectionLimit: 10, // Adjust as needed
  host: '10.172.57.122', //hostname 
  port: '3306', //mysql port
  user: 'nextjsuser', //mysql user with remote access required
  password: 'Test@123!',
  database: 'vouchertest'
});

// Test the connection
pool.getConnection((err, connection) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');
  connection.release(); // Release the connection
});

module.exports = pool;