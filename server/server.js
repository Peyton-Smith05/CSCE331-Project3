const express = require('express');
const cors = require('cors');
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

<<<<<<< HEAD
=======

>>>>>>> cb874d662d792e0c1e7ae0313a90294785d59ef6
// API endpoint to get users
app.get('/api/menu-items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'what\'\'s new\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get topping menu items
app.get('/menu-items/topping', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'topping\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get classic menu items
app.get('/menu-items/classic', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'classic\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get espresso menu items
app.get('/menu-items/espresso', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'espresso\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get milk tea menu items
app.get('/menu-items/milk-tea', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'milk tea\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get slush menu items
app.get('/menu-items/slush', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'slush\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get yogurt menu items
app.get('/menu-items/yogurt', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'yogurt\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get milk cap menu items
app.get('/menu-items/milk-cap', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'milk cap\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get punch menu items
app.get('/menu-items/punch', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'punch\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// API endpoint to get milk strike menu items
app.get('/menu-items/milk-strike', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'milk strike\'');
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
const PORT =  3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
