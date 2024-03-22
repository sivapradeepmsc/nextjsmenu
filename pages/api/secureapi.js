// pages/api/secure-api.js

import { createConnection } from 'mysql2/promise'; // Import MySQL library
import { RateLimiterMemory } from 'rate-limiter-flexible';

// Create a rate limiter instance
const rateLimiter = new RateLimiterMemory({
  points: 10, // Number of requests
  duration: 1, // Per 1 second
});

// Database connection configuration
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
};

// Function to create database connection
async function createDBConnection() {
  return await createConnection(dbConfig);
}

export default async function handler(req, res) {
  // Rate limiting middleware
  try {
    await rateLimiter.consume(req.socket.remoteAddress);
  } catch (rlRejected) {
    console.log(rlRejected);
    res.status(429).json({ error: 'Too Many Requests' });
    return;
  }

  // Secure key validation
  const secureKey = req.headers['x-secure-key'];
  if (!verifySecureKey(secureKey)) {
    res.status(401).json({ error: 'Unauthorized' });
    return;
  }

  // Database connection
  let connection;
  try {
    connection = await createDBConnection();

    // Example: Query database
    const [rows, fields] = await connection.execute('SELECT * FROM your_table');

    // Example: Return data from database
    res.status(200).json({ data: rows });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

function verifySecureKey(secureKey) {

  const knownSecureKey = process.env.SECURE_KEY; // Load secure key from environment variable
  return secureKey === knownSecureKey;
}
