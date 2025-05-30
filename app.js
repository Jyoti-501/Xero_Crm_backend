const express = require('express');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const customerRoutes = require('./routes/customers');
const orderRoutes = require('./routes/orders');
const campaignRoutes = require('./routes/campaigns');

const app = express();

// ✅ Enable CORS for all origins
app.use(cors());

// ✅ Middleware to parse JSON bodies
app.use(express.json());

// ✅ Route Mounting
app.use('/api/auth', authRoutes);
app.use('/api/customers', customerRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/campaigns', campaignRoutes);

module.exports = app;
