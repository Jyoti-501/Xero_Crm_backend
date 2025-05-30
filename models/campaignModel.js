const db = require('../db');

async function getAllCampaigns() {
  const [rows] = await db.execute('SELECT * FROM campaigns ORDER BY id DESC');
  return rows;
}

module.exports = { getAllCampaigns };
