const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config();

const path = __dirname + "/../client/dist/";
const app = express();

// Middleware
app.use(express.static(path));
app.use(cors());
app.use(express.json()); // for parsing application/json

const { Pool } = require('pg');

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});


// Initial API point to access landing page.
app.get('/', async (req, res) => {
  res.sendFile(path + "index.html");
});

// API endpoint to get users
app.get('/api/menu-items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get menu categories
app.get('/menu-items/category', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT DISTINCT category FROM menu');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(process.env.PORT || 8081, () => {
  console.log(`Server is running on port ${PORT}.`);
});
