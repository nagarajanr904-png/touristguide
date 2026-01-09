const express = require('express');
const router = express.Router();
const { getTransport, getBuses, getTrains } = require('../controllers/transportController');

router.get('/', getTransport);
router.get('/bus', getBuses);
router.get('/train', getTrains);

module.exports = router;
