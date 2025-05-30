const express = require('express');
const router = express.Router();
const db = require('../db');

router.get('/', async (req, res) => {
  const [orders] = await db.execute('SELECT * FROM orders');
  res.json(orders);
});

router.post('/add', async (req, res) => {
  const { customer_id, amount, date } = req.body;
  try {
    await db.execute(
      'INSERT INTO orders (customer_id, amount, date) VALUES (?, ?, ?)',
      [customer_id, amount, date]
    );
    res.status(201).send('Order added');
  } catch (err) {
    res.status(500).send('Error adding order');
  }
});

module.exports = router; // ✅ Important!
