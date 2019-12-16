const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('@evnotify/middlewares').authenticationHandler;
const settingsController = require('../controllers/settings');

router.get('/:akey', authenticationMiddleware, settingsController.getSettings);
router.put('/:akey', authenticationMiddleware, settingsController.replaceOrCreateSettings);
router.patch('/:akey/', authenticationMiddleware, settingsController.updateSettings);

module.exports = router;