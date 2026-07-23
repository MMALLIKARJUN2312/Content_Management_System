const { Router } = require('express');
const authRoutes = require('./auth.routes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy', data: { uptime: process.uptime() } });
});

router.use('/auth', authRoutes);

module.exports = router;
