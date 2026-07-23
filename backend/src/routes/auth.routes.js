const { Router } = require('express');
const { login, logout, me } = require('../controllers/authController');
const validate = require('../middleware/validate');
const { loginSchema } = require('../schemas/authSchemas');
const authGuard = require('../middleware/authGuard');

const router = Router();

router.post('/login', validate(loginSchema), login);
router.post('/logout', logout);
router.get('/me', authGuard, me);

module.exports = router;
