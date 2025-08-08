const express = require('express');
const router = express.Router();
const { getAdminStats, getGenreStats, getSalesTrends } = require('./admin.stats');

// Simple test route (no auth for now)
router.get('/', (req, res) => {
    res.json({
        success: true,
        message: 'Admin API is working!'
    });
});

// Stats routes
router.get('/stats', getAdminStats);
router.get('/genre-stats', getGenreStats);
router.get('/sales-trends', getSalesTrends);

module.exports = router;