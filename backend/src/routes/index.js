const { Router } = require('express');
const authRoutes = require('./auth.routes');
const standardsRoutes = require('./standards.routes');
const adminRoutes = require('./admin.routes');

const router = Router();

router.get('/health', (req, res) => {
  res.json({ success: true, message: 'API is healthy', data: { uptime: process.uptime() } });
});

router.use('/auth', authRoutes);
router.use('/standards', standardsRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
