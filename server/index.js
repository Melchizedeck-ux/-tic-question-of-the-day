const express = require('express');
const cors = require('cors');
require('dotenv').config();

const db = require('./database');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'TiC Server and SQLite Database running.' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server listening on port ${PORT}`);
});