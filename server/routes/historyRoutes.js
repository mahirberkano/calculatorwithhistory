const express = require('express');
const router = express.Router();
const historyController = require('../controllers/historyController');

// Existing routes
router.get('/', historyController.getHistory);
router.post('/', historyController.addCalculation);

// New route to clear history
router.delete('/', historyController.clearHistory);

module.exports = router;
