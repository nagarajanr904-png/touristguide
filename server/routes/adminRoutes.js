const express = require('express');
const router = express.Router();
const { adminLogin, getDashboardStats, getVisitorLogs, logVisitor } = require('../controllers/adminController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/login', adminLogin);
router.get('/stats', protectAdmin, getDashboardStats);
router.get('/visitors', protectAdmin, getVisitorLogs);
router.post('/track', logVisitor);

module.exports = router;
