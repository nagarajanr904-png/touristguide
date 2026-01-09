const express = require('express');
const router = express.Router();
const { getAllPlaces, createPlace, getPlaceById } = require('../controllers/placeController');

router.get('/', getAllPlaces);
router.post('/', createPlace);
router.get('/:id', getPlaceById);

module.exports = router;
