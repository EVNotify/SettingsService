const express = require('express');
const router = express.Router();

const authenticationMiddleware = require('@evnotify/middlewares').authenticationHandler;
const authorizationMiddleware = require('@evnotify/middlewares').authorizationHandler;
const settingsController = require('../controllers/settings');

router.get('/:akey', authorizationMiddleware, authenticationMiddleware, settingsController.getSettings);
router.patch('/:akey/', authorizationMiddleware, authenticationMiddleware, settingsController.updateSettings);
router.delete('/:akey', authorizationMiddleware, authenticationMiddleware, settingsController.deleteSettings);

module.exports = router;