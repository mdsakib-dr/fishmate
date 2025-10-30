const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authRoutes');
const pondRoutes = require('./routes/pondRoutes');
const sensorRoutes = require('./routes/sensorRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/ponds', pondRoutes);
app.use('/api/sensors', sensorRoutes);

app.get('/', (req, res) => res.send('Fishmate Assistant API is up'));

module.exports = app;
