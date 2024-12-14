const express = require('express');
const { login } = require('../controllers/authController');
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");

router.get("/get", authMiddleware.verifyToken, listingController.getListings);

router.get('/login', login);

module.exports = router;
