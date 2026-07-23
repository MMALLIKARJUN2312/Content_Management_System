const { Router } = require('express');
const authGuard = require('../middleware/authGuard');
const validate = require('../middleware/validate');
const {
  createStandardSchema,
  updateStandardSchema,
  createVersionSchema,
  updateSectionsSchema,
  transitionSchema,
} = require('../schemas/standardSchemas');
const {
  listStandardsAdmin,
  createStandard,
  updateStandard,
  deleteStandard,
  getAdminStats,
} = require('../controllers/standardController');
const {
  listVersionsAdmin,
  createVersion,
  getVersionAdmin,
  updateSections,
  transitionVersion,
  deleteVersion,
} = require('../controllers/versionController');

const router = Router();

router.use(authGuard);

router.get('/stats', getAdminStats);

router.get('/standards', listStandardsAdmin);
router.post('/standards', validate(createStandardSchema), createStandard);
router.patch('/standards/:id', validate(updateStandardSchema), updateStandard);
router.delete('/standards/:id', deleteStandard);

router.get('/standards/:id/versions', listVersionsAdmin);
router.post('/standards/:id/versions', validate(createVersionSchema), createVersion);

router.get('/versions/:versionId', getVersionAdmin);
router.patch('/versions/:versionId/sections', validate(updateSectionsSchema), updateSections);
router.post('/versions/:versionId/transition', validate(transitionSchema), transitionVersion);
router.delete('/versions/:versionId', deleteVersion);

module.exports = router;
