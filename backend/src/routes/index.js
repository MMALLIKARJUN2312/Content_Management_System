const { Router } = require('express');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy', data: { uptime: process.uptime() } });
});

module.exports = router;
