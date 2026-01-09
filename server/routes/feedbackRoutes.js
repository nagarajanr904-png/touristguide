const express = require('express');
const router = express.Router();
const { submitFeedback, getAllFeedback, deleteFeedback } = require('../controllers/feedbackController');
const { protectAdmin } = require('../middleware/authMiddleware');

router.post('/', submitFeedback);
router.get('/', protectAdmin, getAllFeedback);
router.delete('/:id', protectAdmin, deleteFeedback);

module.exports = router;
