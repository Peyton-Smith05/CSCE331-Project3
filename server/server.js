const express = require('express');
const cors = require('cors');
const history = require('connect-history-api-fallback');
require('dotenv').config();

const app = express();
const path = __dirname + "/../client/dist/";

history({
  index: 'index.htmp'
});

const corsOptions = {
  origin: 'http://localhost:5173', // TODO : CHANGE BEFORE MERGE!!!!!!
  methods: 'POST'
};

// Middleware
app.use(express.static(path));
app.use(cors());
app.use(express.json());  // for parsing application/json
app.use(history());       // Use since  SPA is not server side rendering.
                          // At least for the majority. So, when you access 
                          // /anything your web server won't redirect it to index.html. 

const { Pool } = require('pg');

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


app.get('/drinkid', async (req, res) => {
  try { 
    const { rows } = await pool.query('SELECT MAX(drinkid) FROM drink');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

app.get('/orderid', async (req, res) => {
  try { 
    const { rows } = await pool.query('SELECT MAX(orderid) FROM order_log');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

app.get('/toppingid', async (req, res) => {
  try { 
    const { rows } = await pool.query('SELECT MAX(toppingid) FROM topping');
    res.json(rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
})

app.post('/api/order', cors(corsOptions), async (req, res) => {
  const { orderid, empid, date, time, total, tip } = req.body;
  console.log(orderid);
  
  const insertQuery = 'INSERT INTO order_log(orderid, empid, date, time, total, tip) VALUES($1, $2, $3, $4, $5, $6)';

  try {
      await pool.query(insertQuery, [orderid, empid, date, time, total, tip]);
      res.status(201).send('Order log created successfully');
  } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
  }
});

app.post('/api/drink', cors(corsOptions), async (req, res) => {
  const { drinkid, orderid, name, category, size, temp, ice_level, sugar_level, price } = req.body;

  console.log(drinkid);

  const insertQuery = 'INSERT INTO drink(drinkid, orderid, name, category, size, temp, ice_level, sugar_level, price) VALUES($1, 2$, 3$, 4$, 5$, 6$, 7$, 8$, 9$)';

  try {
    await pool.query(insertQuery, [drinkid, orderid, name, category, size, temp, ice_level, sugar_level, price]);
    res.status(201).send('Drink created successfully');
  } catch {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})

app.post('/api/topping', cors(corsOptions), async (req, res) => {
  const { toppingid, drinkid, name, quantity, price } = req.body;

  console.log(toppingid);

  const insertQuery = 'INSERT INTO topping(toppingid, drinkid, name, quantity, price) VALUES($1, 2$, 3$, 4$, 5$)';

  try {
    await pool.query(insertQuery, [toppingid, drinkid, name, quantity, price]);
    res.status(201).send('Drink created successfully');
  } catch {
    console.error(err.message);
    res.status(500).send('Server error');
  }
})


// Define the port
const PORT = 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});