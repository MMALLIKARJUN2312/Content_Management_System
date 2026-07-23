const { Router } = require('express');
const {
  listStandardsPublic,
  getStandardPublic,
  getVersionPublic,
  getVersionFeedbackPublic,
} = require('../controllers/standardController');

const router = Router();

router.get('/', listStandardsPublic);
router.get('/:slug', getStandardPublic);
router.get('/:slug/versions/:versionId', getVersionPublic);
router.get('/:slug/versions/:versionId/feedback', getVersionFeedbackPublic);

module.exports = router;
