const express = require('express');
const router = express.Router();

const settingsController = require('../controllers/settings');

router.get('/:akey', settingsController.getSettings);
router.put('/:akey', settingsController.replaceOrCreateSettings);
router.patch('/:akey/', settingsController.updateSettings);

module.exports = router;