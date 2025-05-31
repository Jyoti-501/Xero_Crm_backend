const app = require('./app');
const cors = require('cors');

// Allow CORS from all origins (or your frontend domain for security)
app.use(cors({
  origin: 'https://xero-crm-frontend-stvo.vercel.app',
  methods: ['GET', 'POST'],
}));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
