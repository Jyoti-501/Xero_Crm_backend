const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all customers
router.get('/', async (req, res) => {
  try {
    const [customers] = await db.execute('SELECT * FROM customers');
    res.json(customers);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to load customers');
  }
});

// POST new customer
router.post('/add', async (req, res) => {
  const { name, email, spend, visits, last_active } = req.body;
  try {
    await db.execute(
      'INSERT INTO customers (name, email, spend, visits, last_active) VALUES (?, ?, ?, ?, ?)',
      [name, email, spend, visits, last_active]
    );
    res.status(201).send('Customer added');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error adding customer');
  }
});

module.exports = router;
