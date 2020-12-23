const express = require('express');

const settingsController = require('../controllers/settings');
const isAdmin = require('../middleware/isAdmin');

const router = express.Router();

router.put(
    '/addCoverPhotos',
    isAdmin,
    settingsController.addCoverPhotos
);

router.get(
    '/coverPhotos',
    settingsController.getCoverPhotos
);

module.exports = router;