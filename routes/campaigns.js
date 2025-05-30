const express = require('express');
const router = express.Router();
const db = require('../db');

// CREATE campaign + simulate delivery
router.post('/', async (req, res) => {
  const { name, rules } = req.body;

  try {
    // Simulate getting all users (filtering can be added later)
    const [customers] = await db.execute('SELECT * FROM customers');

    const audienceSize = customers.length;
    let sent = 0, failed = 0;

    for (const customer of customers) {
      const message = `Hi ${customer.name}, enjoy a special offer! 🎉`;
      const status = Math.random() < 0.9 ? 'SENT' : 'FAILED';

      if (status === 'SENT') sent++;
      else failed++;

      await db.execute(
        'INSERT INTO communication_log (campaign_name, customer_id, message, status) VALUES (?, ?, ?, ?)',
        [name, customer.id, message, status]
      );
    }

    await db.execute(
      'INSERT INTO campaigns (name, rules, audience_size, sent, failed) VALUES (?, ?, ?, ?, ?)',
      [name, rules, audienceSize, sent, failed]
    );

    res.status(201).send('Campaign launched and delivery simulated.');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error launching campaign');
  }
});

// HISTORY route
router.get('/history', async (req, res) => {
  try {
    const [rows] = await db.execute('SELECT * FROM campaigns ORDER BY id DESC');
    res.json(rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to fetch campaign history');
  }
});

module.exports = router;
