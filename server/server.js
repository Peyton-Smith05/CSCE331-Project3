const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();
const path = __dirname + "/../client/dist/";

history({
  index: 'index.htmp'
});

// Middleware
app.use(express.static(path));
app.use(cors());
app.use(express.json());  // for parsing application/json
app.use(history());       // Use since  SPA is not server side rendering.
                          // At least for the majority. So, when you access 
                          // /anything your web server won't redirect it to index.html. 

const { Pool, DatabaseError } = require('pg');

const pool = new Pool({
    user: process.env.PSQL_USER,
    host: process.env.PSQL_HOST,
    database: process.env.PSQL_DATABASE,
    password: process.env.PSQL_PASSWORD,
    port: process.env.PSQL_PORT,
    ssl: {rejectUnauthorized: false}
});

app.get('/api/menu-items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu');
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

// API endpoint to get users
app.get('/menu-items', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

app.get('/menu-items/toppings', async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT * FROM menu WHERE category = \'topping\'');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
});

// ======= LOGIN API REQUESTS FOR LOGIN INFORMATION ==========
app.get("/login/info/:email/:pswd", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee WHERE email = \'" + req.params.email + "\' AND password = \'" + req.params.pswd + "\'");
    if (rows.length == 0) {
      res.status(404).json('Could not find user');
    }
    else {
      res.json(rows);
    }
  } catch (err) {
    console.error(err.message);
    res.status(404).json('Could not find user');
  }
})

// This one uses google OAuth and the simple email to check what our data.
app.get("/login/info/google/:email", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee WHERE email = \'" + req.params.email + "\'");
    if(rows.length == 0) {
      res.status(404).json('Could not find user with email ', req.params.email);
    } else {
      res.json(rows);
    }

  } catch (err) {
    console.error(err.message);
    res.status(404).json('Could not find user with email ', req.params.email);
  }
})

// ======= MANAGER API REQUESTS FOR INVENTORY INFORMATION ==========
app.get("/manager/inventory", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM inventory");
    res.json(rows);
  }
  catch (err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.get("/manager/employee", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM employee WHERE employee.title=\'Cashier\'");
    res.json(rows);
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.get("/manager/inventory_requests", async (req, res) => {
  try {
    const { rows } = await pool.query("SELECT * FROM inventory_requests");
    res.json(rows);
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.get("/manager/sales-report-day/:start_date/:end_date", async(req, res) => {
  
  try{
    console.log("Checking validity of dates.")
  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

app.get("/manager/sales-report-hour/:start_date_time/:end_date_time", async(req, res) => {
  try{

  } catch(err) {
    console.error(err.message);
    res.status(500).json('Server Error');
  }
})

// Define the port
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});