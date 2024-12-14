const express = require('express');
const { getListings } = require('../controllers/listingController');
const router = express.Router();

router.get('/get', getListings);

module.exports = router;
