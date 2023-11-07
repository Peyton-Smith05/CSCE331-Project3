const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // for parsing application/json

// Define the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

const path = require('path');

// Serve Vue.js App
app.use(express.static(path.join(__dirname, '../client/dist')));

// Handle SPA (Single Page Application)
app.get(/.*/, (req, res) => res.sendFile(path.join(__dirname, '../client/dist/index.html')));