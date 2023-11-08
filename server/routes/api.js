const pool = require('../db'); // Assuming you have a db.js file for the pool

// Get data endpoint
app.get('/api/data', async (req, res) => {
  try {
    const data = await pool.query('SELECT * FROM order_log LIMIT 10');
    res.json(data.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

